import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to get local date string (YYYY-MM-DD) in Pakistan timezone
function toLocalDateString(date: Date): string {
    return date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Karachi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}

// Helper to get day of week in Pakistan timezone
function getPakistanDay(date: Date): number {
    const s = date.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
    return new Date(s).getDay();
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const dateStr = searchParams.get("date");
        const purpose = searchParams.get("purpose");

        // Get day availability settings
        const dayAvailability = await prisma.dateAvailability.findMany();
        const disabledDays = dayAvailability
            .filter(d => !d.isAvailable)
            .map(d => d.dayOfWeek);

        // Always include Sunday as disabled
        if (!disabledDays.includes(0)) {
            disabledDays.push(0);
        }

        // Get blocked dates and convert to local date strings
        const blockedDates = await prisma.blockedDate.findMany({
            where: {
                date: { gte: new Date() }
            }
        });
        const blockedDateStrings = blockedDates.map(bd => toLocalDateString(new Date(bd.date)));

        // Get time settings for general appointments
        const timeSettings = await prisma.timeSlotSettings.findFirst();
        const generalTimeRange = timeSettings
            ? { startTime: timeSettings.startTime, endTime: timeSettings.endTime }
            : { startTime: "10:00", endTime: "14:00" }; // Default

        // If a specific date is provided, fetch available slots for that date
        let availableSlots: string[] = [];
        if (dateStr && purpose) {
            if (purpose === "principal") {
                // Get ALL active principal slots
                const allPrincipalSlots = await prisma.principalSlot.findMany({
                    where: { isActive: true }
                });

                // Filter for matching slots (either specific date or recurring day)
                // dateStr is expected to be YYYY-MM-DD from the client
                const dateString = dateStr;
                // Use robust helper to get the day of week in Pakistan
                const dayOfWeek = getPakistanDay(new Date(dateStr + 'T12:00:00+05:00'));

                const matchingSlots = allPrincipalSlots.filter(slot => {
                    // Check if it matches a specific date
                    if (slot.date) {
                        const slotDateString = toLocalDateString(new Date(slot.date));
                        return slotDateString === dateString;
                    }
                    // Check if it matches a day of week
                    if (slot.dayOfWeek !== null) {
                        return slot.dayOfWeek === dayOfWeek;
                    }
                    return false;
                });

                // Get already booked slots for this date
                const bookedSlots = await prisma.$queryRaw<{ timeSlot: string }[]>`
          SELECT timeSlot FROM appointment 
          WHERE DATE(date) = ${dateString} AND status IN ('PENDING', 'CONFIRMED', 'RESCHEDULED')
        `;
                const bookedTimeSlots = bookedSlots.map(s => s.timeSlot);

                // Filter out booked slots
                availableSlots = matchingSlots
                    .map(s => s.time)
                    .filter(t => !bookedTimeSlots.includes(t));
            }
            // For general appointments, the form uses a time picker (any time in range)
        }

        // Get Principal slots for display (dates and days)
        const principalSlots = await prisma.principalSlot.findMany({
            where: { isActive: true },
            orderBy: [{ date: "asc" }, { dayOfWeek: "asc" }]
        });

        const principalDates = principalSlots
            .filter(s => s.date)
            .map(s => toLocalDateString(new Date(s.date!)));

        const principalDays = [...new Set(principalSlots
            .filter(s => s.dayOfWeek !== null)
            .map(s => s.dayOfWeek!))];

        return NextResponse.json({
            ok: true,
            disabledDays,
            blockedDates: blockedDateStrings,
            generalTimeRange,
            availableSlots,
            principalDates,
            principalDays
        });
    } catch (error) {
        console.error("Error fetching available slots:", error);
        return NextResponse.json(
            { ok: false, message: "Failed to fetch available slots" },
            { status: 500 }
        );
    }
}
