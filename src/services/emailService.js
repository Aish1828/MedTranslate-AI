const RESEND_URL = "/api/resend/email";

export async function sendAppointmentEmail(
  patientEmail,
  doctorName,
  specialization,
  date,
  time,
  reason
) {
  try {
    // Load HTML template
    const templateResponse = await fetch("/mail.html");

    let html = await templateResponse.text();

    // Replace placeholders
    html = html.replace("{{doctorName}}", doctorName);
    html = html.replace(
      "{{specialization}}",
      specialization
    );
    html = html.replace("{{date}}", date);
    html = html.replace("{{time}}", time);
    html = html.replace("{{reason}}", reason);

    // Send email
    const response = await fetch(
      RESEND_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          from:
            "MedTranslate <onboarding@resend.dev>",

          to: [patientEmail],

          subject:
            "Appointment Booked Successfully",

          html, // <-- use mail.html content here
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(
      "Email sending failed:",
      error
    );
  }
}
export async function sendReportEmail(
  familyEmail,
  reportName,
  reportLink
) {
  try {
    // Load Share Report Template
    const templateResponse =
      await fetch("/shareReport.html");

    let html =
      await templateResponse.text();

    // Replace placeholders
    html = html.replace(
      "{{reportName}}",
      reportName
    );

    html = html.replace(
      "{{reportLink}}",
      reportLink
    );

    // Send Email
    const response = await fetch(
      RESEND_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          from:
            "MedTranslate <onboarding@resend.dev>",

          to: ["aish18n@gmail.com"],

          subject:
            "Medical Report Shared",

          html,
        }),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(
      "Share report email failed:",
      error
    );
  }
}