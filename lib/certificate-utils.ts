import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

// Dimensions from requirements
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 1414;

// Colors
const COLOR_BLACK = rgb(0, 0, 0);

interface CertificateData {
    studentName: string;
    type: string;
    commendation1: string;
    commendation2: string;
    verifyCode: string;
}

const CERTIFICATE_TEMPLATES: Record<string, string> = {
    'CHARACTER': 'character-certificate.jpg',
    'PROVISIONAL': 'provisional-certificate.jpg',
    'LEAVING': 'leaving-certificate.jpg',
    'APPRECIATION': 'appreciation-certificate.jpg',
    'EXPERIENCE': 'teacher-experience-certificate.jpg'
};

export async function generateCertificatePDF(data: CertificateData, baseUrl: string): Promise<Uint8Array> {
    const { studentName, type, commendation1, commendation2, verifyCode } = data;

    // 1. Load the background image based on type
    const templateFileName = CERTIFICATE_TEMPLATES[type] || 'character-certificate.jpg';
    const templatePath = path.join(process.cwd(), 'public/webImages/certificates', templateFileName);

    // Fallback if the file doesn't exist (e.g. legacy path or missing file)
    let templateBytes;
    if (fs.existsSync(templatePath)) {
        templateBytes = fs.readFileSync(templatePath);
    } else {
        // Fallback to the old default if new ones are missing
        const fallbackPath = path.join(process.cwd(), 'public/webImages/Certificate.jpg');
        templateBytes = fs.readFileSync(fallbackPath);
    }

    // 2. Create PDF and embed image
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([CANVAS_WIDTH, CANVAS_HEIGHT]);
    const image = await pdfDoc.embedJpg(templateBytes);

    page.drawImage(image, {
        x: 0,
        y: 0,
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    });

    // 3. Embed Font
    // Register fontkit to support custom fonts
    const fontkit = require('fontkit');
    pdfDoc.registerFontkit(fontkit);

    // Load Great Vibes font
    const fontPath = path.join(process.cwd(), 'public/fonts/GreatVibes-Regular.ttf');
    if (!fs.existsSync(fontPath)) {
        throw new Error(`Font file not found at ${fontPath}`);
    }
    const fontBytes = fs.readFileSync(fontPath);
    const greatVibesFont = await pdfDoc.embedFont(fontBytes);

    // Load Playfair Display SemiBold
    const playfairPath = path.join(process.cwd(), 'public/fonts/PlayfairDisplay-SemiBold.ttf');
    let playfairFont;
    if (fs.existsSync(playfairPath)) {
        const playfairBytes = fs.readFileSync(playfairPath);
        playfairFont = await pdfDoc.embedFont(playfairBytes);
    } else {
        playfairFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    }

    // 4. Draw Text
    const calculateFontSize = (text: string, maxWidth: number, fontSize: number, font: any) => {
        let currentFontSize = fontSize;
        let textWidth = font.widthOfTextAtSize(text, currentFontSize);

        while (textWidth > maxWidth && currentFontSize > 10) {
            currentFontSize -= 1;
            textWidth = font.widthOfTextAtSize(text, currentFontSize);
        }
        return currentFontSize;
    };

    const drawCenteredText = (text: string, yBase: number, currentFontSize: number, font: any) => {
        const textWidth = font.widthOfTextAtSize(text, currentFontSize);
        const x = (CANVAS_WIDTH - textWidth) / 2;
        const pdfY = CANVAS_HEIGHT - yBase;

        page.drawText(text, {
            x,
            y: pdfY,
            size: currentFontSize,
            font: font,
            color: COLOR_BLACK,
        });
    };

    const MAX_TEXT_WIDTH = 1800; // Increased from 1400

    // 1) Student Name: baselineY: 750 (user updated manually). Size: 105. Font: Great Vibes.
    const nameFontSize = calculateFontSize(studentName, MAX_TEXT_WIDTH, 105, greatVibesFont);
    drawCenteredText(studentName, 750, nameFontSize, greatVibesFont);

    // 2, 3 & 4) Synchronized Lines: "This certificate is presented to", Commendation 1, and Commendation 2
    const presentationText = "This certificate is presented to";

    // Calculate sizes for all three synchronized lines
    const sizePresentation = calculateFontSize(presentationText, MAX_TEXT_WIDTH, 53, playfairFont);
    const size1 = calculateFontSize(commendation1, MAX_TEXT_WIDTH, 53, playfairFont);
    const size2 = calculateFontSize(commendation2, MAX_TEXT_WIDTH, 53, playfairFont);

    // Find the smallest size among the three
    const sharedCommSize = Math.min(sizePresentation, size1, size2);

    // Draw "This certificate is presented to": baselineY: 500.
    drawCenteredText(presentationText, 500, sharedCommSize, playfairFont);

    // Draw Commendation Line 1: baselineY: 860.
    drawCenteredText(commendation1, 860, sharedCommSize, playfairFont);

    // Draw Commendation Line 2: baselineY: 930.
    drawCenteredText(commendation2, 930, sharedCommSize, playfairFont);

    // 5. Generate and Draw QR Code
    const verifyUrl = `${baseUrl}/verify/${verifyCode}`;
    const qrBase64 = await QRCode.toDataURL(verifyUrl, { margin: 0 });
    const qrImageBytes = Buffer.from(qrBase64.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    const qrSize = 200;
    page.drawImage(qrImage, {
        x: 1770,
        y: 30,
        width: qrSize,
        height: qrSize,
    });

    // 6. Draw Favicon in Center of QR Code
    const faviconPath = path.join(process.cwd(), 'public/favicon12.png');
    if (fs.existsSync(faviconPath)) {
        const faviconBytes = fs.readFileSync(faviconPath);
        const faviconImage = await pdfDoc.embedPng(faviconBytes);

        const iconSize = 60;
        const iconX = 1870 - (iconSize / 2);
        const iconY = 130 - (iconSize / 2);

        page.drawImage(faviconImage, {
            x: iconX,
            y: iconY,
            width: iconSize,
            height: iconSize,
        });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
