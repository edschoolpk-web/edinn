"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/email-utils";
import {
  generateConfirmationEmail,
  generateRejectionEmail,
  generateRescheduleEmail
} from "@/lib/email-templates";

// ============ APPOINTMENT ACTIONS ============

export async function getAppointments(filters?: {
  status?: string;
  purpose?: string;
  search?: string;
}) {
  const where: Record<string, unknown> = {};

  if (filters?.status && filters.status !== "all") {
    where.status = filters.status;
  }

  if (filters?.purpose && filters.purpose !== "all") {
    where.purpose = { contains: filters.purpose };
  }

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { email: { contains: filters.search } },
      { phone: { contains: filters.search } },
    ];
  }

  return prisma.appointment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function acceptAppointment(id: string) {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "CONFIRMED" },
  });

  // Send confirmation email
  await sendEmail({
    to: appointment.email,
    subject: "Appointment Confirmed - Engineers & Doctors School",
    html: generateConfirmationEmail(appointment.name, appointment.purpose, formatDate(appointment.date), appointment.timeSlot),
  });

  revalidatePath("/admin/appointments");
  return { ok: true };
}

export async function rejectAppointment(id: string, reason?: string) {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: "REJECTED", adminNote: reason || null },
  });

  // Send rejection email
  await sendEmail({
    to: appointment.email,
    subject: "Appointment Update - Engineers & Doctors School",
    html: generateRejectionEmail(appointment.name, reason),
  });

  revalidatePath("/admin/appointments");
  return { ok: true };
}

export async function rescheduleAppointment(id: string, newDate: Date, newTimeSlot: string, note?: string) {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: {
      status: "RESCHEDULED",
      date: newDate,
      timeSlot: newTimeSlot,
      adminNote: note || null
    },
  });

  // Send reschedule email
  await sendEmail({
    to: appointment.email,
    subject: "Appointment Rescheduled - Engineers & Doctors School",
    html: generateRescheduleEmail(appointment.name, formatDate(newDate), newTimeSlot),
  });

  revalidatePath("/admin/appointments");
  return { ok: true };
}

export async function deleteAppointment(id: string) {
  await prisma.appointment.delete({ where: { id } });
  revalidatePath("/admin/appointments");
  return { ok: true };
}

// ============ TIME SETTINGS ACTIONS ============

export async function getTimeSettings() {
  const settings = await prisma.timeSlotSettings.findFirst();
  return settings;
}

export async function updateTimeSettings(startTime: string, endTime: string) {
  const existing = await prisma.timeSlotSettings.findFirst();

  if (existing) {
    await prisma.timeSlotSettings.update({
      where: { id: existing.id },
      data: { startTime, endTime },
    });
  } else {
    await prisma.timeSlotSettings.create({
      data: { startTime, endTime },
    });
  }

  revalidatePath("/admin/appointments");
  return { ok: true };
}

// ============ PRINCIPAL SLOTS ACTIONS ============

export async function getPrincipalSlots() {
  return prisma.principalSlot.findMany({
    orderBy: [{ date: "asc" }, { dayOfWeek: "asc" }, { time: "asc" }],
  });
}

export async function createPrincipalSlot(data: { date?: Date; dayOfWeek?: number; time: string }) {
  await prisma.principalSlot.create({ data });
  revalidatePath("/admin/appointments");
  return { ok: true };
}

export async function deletePrincipalSlot(id: string) {
  await prisma.principalSlot.delete({ where: { id } });
  revalidatePath("/admin/appointments");
  return { ok: true };
}

export async function togglePrincipalSlot(id: string, isActive: boolean) {
  await prisma.principalSlot.update({
    where: { id },
    data: { isActive },
  });
  revalidatePath("/admin/appointments");
  return { ok: true };
}

// ============ DAY AVAILABILITY ACTIONS ============

export async function getDayAvailability() {
  // Get existing settings or create defaults
  const existing = await prisma.dateAvailability.findMany();

  if (existing.length === 0) {
    // Create default settings (all days except Sunday)
    const defaults = [
      { dayOfWeek: 0, isAvailable: false }, // Sunday - always disabled
      { dayOfWeek: 1, isAvailable: true },  // Monday
      { dayOfWeek: 2, isAvailable: true },  // Tuesday
      { dayOfWeek: 3, isAvailable: true },  // Wednesday
      { dayOfWeek: 4, isAvailable: true },  // Thursday
      { dayOfWeek: 5, isAvailable: true },  // Friday
      { dayOfWeek: 6, isAvailable: true },  // Saturday
    ];

    await prisma.dateAvailability.createMany({ data: defaults });
    return defaults.map((d, i) => ({ id: `temp-${i}`, ...d }));
  }

  return existing;
}

export async function toggleDayAvailability(dayOfWeek: number, isAvailable: boolean) {
  // Don't allow enabling Sunday
  if (dayOfWeek === 0 && isAvailable) {
    return { ok: false, message: "Sunday cannot be enabled" };
  }

  await prisma.dateAvailability.upsert({
    where: { dayOfWeek },
    create: { dayOfWeek, isAvailable },
    update: { isAvailable },
  });

  revalidatePath("/admin/appointments");
  return { ok: true };
}

// ============ BLOCKED DATES ACTIONS ============

export async function getBlockedDates() {
  return prisma.blockedDate.findMany({
    orderBy: { date: "asc" },
  });
}

export async function addBlockedDate(date: Date, reason?: string) {
  await prisma.blockedDate.create({
    data: { date, reason },
  });
  revalidatePath("/admin/appointments");
  return { ok: true };
}

export async function removeBlockedDate(id: string) {
  await prisma.blockedDate.delete({ where: { id } });
  revalidatePath("/admin/appointments");
  return { ok: true };
}

// ============ HELPERS ============

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-PK", {
    timeZone: "Asia/Karachi",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

