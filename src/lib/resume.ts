import { about, education } from "@/data/about";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { certificates } from "@/data/certificates";
import { projects } from "@/data/projects";

export function generateResumeText(): string {
  return `
${about.name.toUpperCase()}
${about.titles.join(" | ")}
${about.email} | ${about.phone} | ${about.location}

PROFESSIONAL SUMMARY
${about.intro}

CURRENT POSITION
${about.currentPosition}

EDUCATION
${education.degree}
${education.institution} | ${education.period}
${education.description}

EXPERIENCE
${experiences
  .map(
    (e) =>
      `${e.role} — ${e.company} (${e.period})\n${e.description}\n${e.highlights.map((h) => `• ${h}`).join("\n")}`
  )
  .join("\n\n")}

SKILLS
${skillCategories.map((c) => `${c.name}: ${c.skills.join(", ")}`).join("\n")}

PROJECTS
${projects.map((p) => `• ${p.title} [${p.status}] — ${p.techStack.join(", ")}`).join("\n")}

CERTIFICATIONS
${certificates.map((c) => `• ${c.title} — ${c.issuer} (${c.date})`).join("\n")}

LINKS
GitHub: ${about.github}
LinkedIn: ${about.linkedin}
Portfolio: ${about.portfolio}
`.trim();
}

export function generateResumeHtml(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${about.name} — Resume</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 24px; color: #1d1d1f; line-height: 1.6; }
    h1 { font-size: 28px; margin-bottom: 4px; }
    h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #007aff; margin-top: 24px; border-bottom: 1px solid #e5e5ea; padding-bottom: 4px; }
    p, li { font-size: 13px; color: #333; }
    .meta { color: #666; font-size: 13px; }
    ul { padding-left: 18px; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <h1>${about.name}</h1>
  <p class="meta">${about.titles.join(" · ")}</p>
  <p class="meta">${about.email} · ${about.phone} · ${about.location}</p>

  <h2>Summary</h2>
  <p>${about.intro.replace(/\n/g, "<br/>")}</p>

  <h2>Current Position</h2>
  <p>${about.currentPosition}</p>

  <h2>Education</h2>
  <p><strong>${education.degree}</strong><br/>${education.institution} · ${education.period}<br/>${education.description}</p>

  <h2>Experience</h2>
  ${experiences
    .map(
      (e) => `<p><strong>${e.role}</strong> — ${e.company} <em>(${e.period})</em><br/>${e.description}<ul>${e.highlights.map((h) => `<li>${h}</li>`).join("")}</ul></p>`
    )
    .join("")}

  <h2>Skills</h2>
  ${skillCategories.map((c) => `<p><strong>${c.name}:</strong> ${c.skills.join(", ")}</p>`).join("")}

  <h2>Projects</h2>
  <ul>${projects.map((p) => `<li>${p.title} — ${p.techStack.join(", ")}</li>`).join("")}</ul>

  <h2>Certifications</h2>
  <ul>${certificates.map((c) => `<li>${c.title} — ${c.issuer} (${c.date})</li>`).join("")}</ul>
</body>
</html>`;
}
