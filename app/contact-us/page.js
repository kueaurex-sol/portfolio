// "use client";

// import { useState } from "react";
// import DatePicker from "@/components/Datepicker";
// import TimePicker from "@/components/Timepicker";
// import { useSearchParams } from "next/navigation";

// const SOCIALS = [
//   {
//     name: "LinkedIn",
//     href: "https://www.linkedin.com/company/kueaurex-solutions/",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
//         <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.86V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.44-2.16 2.96V21H9z" />
//       </svg>
//     ),
//   },
//   {
//     name: "Instagram",
//     href: "https://www.instagram.com/kueaurexsol?igsi=NHlrOThycmxyaWwz",
//     icon: (
//       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
//         <rect x="3" y="3" width="18" height="18" rx="5" />
//         <circle cx="12" cy="12" r="4" />
//         <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
//       </svg>
//     ),
//   },
//   // {
//   //   name: "WhatsApp",
//   //   href: "https://wa.me/00000000000",
//   //   icon: (
//   //     <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
//   //       <path d="M12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0 0 12.02 22C17.55 22 22 17.52 22 12S17.55 2 12.02 2Zm5.6 14.13c-.24.68-1.38 1.3-1.9 1.35-.5.06-1.02.27-3.4-.7-2.87-1.18-4.7-4.05-4.85-4.24-.14-.19-1.16-1.55-1.16-2.96 0-1.4.74-2.09 1-2.38.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.6.8 2.06.87 2.2.07.15.11.32.02.51-.09.19-.14.31-.28.48-.14.16-.3.36-.42.48-.14.14-.29.29-.13.57.17.28.75 1.24 1.61 2 1.11.99 2.04 1.3 2.33 1.44.28.14.45.12.62-.07.17-.19.72-.83.91-1.11.19-.28.38-.24.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.68-.17 1.36Z" />
//   //     </svg>
//   //   ),
//   // },
//   // {
//   //   name: "Email",
//   //   href: "mailto:hello@kueaurex.com",
//   //   icon: (
//   //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
//   //       <rect x="3" y="5" width="18" height="14" rx="3" />
//   //       <path d="m4 7 8 6 8-6" />
//   //     </svg>
//   //   ),
//   // },
// ];

// const EMPTY_CONTACT = {
//   name: "",
//   email: "",
//   phone: "",
//   subject: "",
//   message: "",
//   scheduleCall: "no", // "yes" | "no"
//   date: "",
//   time: "",
//   notes: "",
// };
// const EMPTY_AUDIT = {
//   companyName: "",
//   repName: "",
//   companyEmail: "",
//   phone: "",
//   altPhone: "",
//   productLink: "",
//   issue: "",
//   directions: "",
//   interactionType: "", // "report" | "meeting" | "both"
//   contactMethod: "", // "whatsapp" | "email" | "both"
// };

// function todayISO() {
//   const d = new Date();
//   d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
//   return d.toISOString().slice(0, 10);
// }

// function minTimeFor(dateStr) {
//   if (!dateStr || dateStr !== todayISO()) return undefined;
//   const now = new Date();
//   const roundedMinutes = Math.ceil(now.getMinutes() / 15) * 15;
//   now.setMinutes(roundedMinutes, 0, 0);
//   return now.toTimeString().slice(0, 5);
// }

// function Field({ label, className = "", ...props }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">{label}</span>
//       <input
//         {...props}
//         className={`w-full rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet ${className}`}
//       />
//     </label>
//   );
// }

// // Simple pill selector, reused for scheduleCall, interactionType and
// // contactMethod — keeps every single-choice field visually consistent
// // with the mode tabs above the form.
// // function PillSelect({ label, value, onChange, options }) {
// //   return (
// //     <div>
// //       <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">{label}</span>
// //       <div className="inline-flex flex-wrap rounded-full border border-ink/10 bg-void p-1">
// //         {options.map((opt) => (
// //           <button
// //             key={opt.value}
// //             type="button"
// //             onClick={() => onChange(opt.value)}
// //             className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
// //               value === opt.value ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
// //             }`}
// //           >
// //             {opt.label}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }
// // function PillSelect({ label, value, onChange, options, layout = "row" }) {
// //   const stacked = layout === "stack";

// //   return (
// //     <div>
// //       <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">{label}</span>
// //       <div
// //         className={
// //           stacked
// //             ? "flex flex-col gap-2 rounded-2xl border border-ink/10 bg-void p-1.5"
// //             : "inline-flex flex-wrap rounded-full border border-ink/10 bg-void p-1"
// //         }
// //       >
// //         {options.map((opt) => (
// //           <button
// //             key={opt.value}
// //             type="button"
// //             onClick={() => onChange(opt.value)}
// //             className={
// //               stacked
// //                 ? `w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
// //                     value === opt.value ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
// //                   }`
// //                 : `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
// //                     value === opt.value ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
// //                   }`
// //             }
// //           >
// //             {opt.label}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// function PillSelect({ label, value, onChange, options, layout = "row" }) {
//   const alwaysStacked = layout === "stack";

//   return (
//     <div>
//       <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">{label}</span>
//       <div
//         className={
//           alwaysStacked
//             ? "flex flex-col gap-2 rounded-2xl border border-ink/10 bg-void p-1.5"
//             : "flex flex-col gap-2 rounded-2xl border border-ink/10 bg-void p-1.5 sm:inline-flex sm:flex-row sm:flex-wrap sm:gap-0 sm:rounded-full sm:p-1"
//         }
//       >
//         {options.map((opt) => (
//           <button
//             key={opt.value}
//             type="button"
//             onClick={() => onChange(opt.value)}
//             className={
//               alwaysStacked
//                 ? `w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
//                     value === opt.value ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
//                   }`
//                 : `w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:py-2 sm:text-center ${
//                     value === opt.value ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
//                   }`
//             }
//           >
//             {opt.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default function Contact() {
//   const [mode, setMode] = useState("contact"); // "contact" | "audit"
//   const [contactForm, setContactForm] = useState(EMPTY_CONTACT);
//   const [auditForm, setAuditForm] = useState(EMPTY_AUDIT);
//   const [website, setWebsite] = useState(""); // honeypot
//   const [status, setStatus] = useState("idle");
//   const [errorMsg, setErrorMsg] = useState("");

//   const form = mode === "contact" ? contactForm : auditForm;
//   const setForm = mode === "contact" ? setContactForm : setAuditForm;

//   const updateField = (key) => (e) =>
//     setForm((prev) => ({ ...prev, [key]: e.target.value }));

//   const updateScheduleDate = (picked) => {
//     const floorDate = todayISO();
//     const nextDate = picked && picked < floorDate ? floorDate : picked;

//     setContactForm((prev) => {
//       const floorTime = minTimeFor(nextDate);
//       const timeStillValid = !floorTime || !prev.time || prev.time >= floorTime;
//       return { ...prev, date: nextDate, time: timeStillValid ? prev.time : "" };
//     });
//   };

//   const updateScheduleTime = (picked) => {
//     setContactForm((prev) => {
//       const floorTime = minTimeFor(prev.date);
//       const nextTime = floorTime && picked && picked < floorTime ? floorTime : picked;
//       return { ...prev, time: nextTime };
//     });
//   };

//   const switchMode = (next) => {
//     if (next === mode) return;
//     setMode(next);
//     setStatus("idle");
//     setErrorMsg("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (mode === "contact" && contactForm.scheduleCall === "yes") {
//       const when = new Date(`${contactForm.date}T${contactForm.time}`);
//       if (
//         !contactForm.date ||
//         !contactForm.time ||
//         Number.isNaN(when.getTime()) ||
//         when.getTime() < Date.now()
//       ) {
//         setStatus("error");
//         setErrorMsg("Pick a date and time that haven't passed yet.");
//         return;
//       }
//     }

//     if (mode === "audit") {
//       if (!auditForm.interactionType) {
//         setStatus("error");
//         setErrorMsg("Let us know whether you'd like a report, a meeting, or both.");
//         return;
//       }
//       if (!auditForm.contactMethod) {
//         setStatus("error");
//         setErrorMsg("Pick how we should send the report.");
//         return;
//       }
//     }

//     setStatus("submitting");
//     setErrorMsg("");

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type: mode, ...form, website }),
//       });
//       const data = await res.json().catch(() => ({ ok: false, error: "Unexpected response." }));

//       if (!res.ok || !data.ok) {
//         setStatus("error");
//         setErrorMsg(data.error || "Something went wrong. Please try again.");
//         return;
//       }

//       setStatus("success");
//       setForm(mode === "contact" ? EMPTY_CONTACT : EMPTY_AUDIT);
//     } catch {
//       setStatus("error");
//       setErrorMsg("Couldn't reach the server. Check your connection and try again.");
//     }
//   };

//   return (
//     <section className="mx-auto grid max-w-6xl gap-14 px-[6vw] py-24 md:grid-cols-2 md:py-32">
//       {/* ---- left: signature "code window" illustration + copy ---- */}
//       <div className="flex flex-col gap-10 ">
//         <div className="relative w-full max-w-md">
//           <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-violet/10 blur-2xl" />
//           <div className="rounded-2xl bg-ink p-5 shadow-xl shadow-ink/10">
//             <div className="flex items-center gap-1.5 pb-4">
//               <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
//               <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
//               <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
//               <span className="ml-3 font-mono text-[11px] tracking-[2px] text-white/30">
//                 new-message.ts
//               </span>
//             </div>
//             <div className="space-y-1.5 font-mono text-[13px] leading-relaxed">
//               <p className="text-violet">
//                 const <span className="text-white/80">message</span> = {"{"}
//               </p>
//               <p className="pl-4 text-white/45">
//                 to: <span className="text-white/75">&quot;hello@kueaurex.com&quot;</span>,
//               </p>
//               <p className="pl-4 text-white/45">
//                 from: <span className="text-white/75">&quot;you@yourcompany.com&quot;</span>,
//               </p>
//               <p className="pl-4 text-white/45">
//                 status: <span className="text-emerald-300">&quot;sending…&quot;</span>
//               </p>
//               <p className="text-violet">{"}"}</p>
//             </div>
//           </div>
//           <div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-full border border-ink/10 bg-void px-4 py-2 shadow-lg shadow-ink/10">
//             <span className="h-2 w-2 rounded-full bg-emerald-400" />
//             <span className="whitespace-nowrap font-mono text-[11px] text-ivory/70">
//               Usually replies within a day
//             </span>
//           </div>
//         </div>

//         <div>
//           <p className="mb-3 font-mono text-[11px] tracking-[3px] text-violet">GET IN TOUCH</p>
//           <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ivory md:text-4xl">
//             Tell us where you want to go. We&apos;ll figure out how to get you there.
//           </h1>
//           <p className="mt-4 max-w-md text-base leading-relaxed text-ivory/60">
//             Send a message — with a call on the calendar if you&apos;d like one — or
//             request a technical audit of what you&apos;ve already built. Either
//             way, a real person gets back to you — not an inbox.
//           </p>
//         </div>

//         <div className="flex items-center gap-3">
//           {SOCIALS.map((s) => (
//             <a
//               key={s.name}
//               href={s.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label={s.name}
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-violet text-white transition-transform hover:scale-105"
//             >
//               {s.icon}
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* ---- right: contact-us / technical-audit form ---- */}
//       <div className="rounded-[2rem] border border-ink/10 bg-plum p-6 shadow-xl shadow-ink/5 md:p-8">
//         {/* <div className="mb-7 inline-flex flex-wrap gap-1 rounded-full border border-ink/10 bg-void p-1">
//           {[
//             { key: "contact", label: "Contact us" },
//             { key: "audit", label: "Technical audit" },
//           ].map((t) => (
//             <button
//               key={t.key}
//               type="button"
//               onClick={() => switchMode(t.key)}
//               className={`rounded-full px-4 py-2 text-sm font-medium transition-colors md:px-5 ${
//                 mode === t.key ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div> */}
// <div className="mb-7 flex w-full flex-col gap-2 rounded-2xl border border-ink/10 bg-void p-1.5 sm:inline-flex sm:w-auto sm:flex-row sm:flex-wrap sm:gap-1 sm:rounded-full sm:p-1">
//   {[
//     { key: "contact", label: "Contact us" },
//     { key: "audit", label: "Technical audit" },
//   ].map((t) => (
//     <button
//       key={t.key}
//       type="button"
//       onClick={() => switchMode(t.key)}
//       className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:py-2 md:px-5 ${
//         mode === t.key ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
//       }`}
//     >
//       {t.label}
//     </button>
//   ))}
// </div>
//         <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//           <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
//             <label>
//               Company website
//               <input
//                 type="text"
//                 tabIndex={-1}
//                 autoComplete="off"
//                 value={website}
//                 onChange={(e) => setWebsite(e.target.value)}
//               />
//             </label>
//           </div>

//           {mode === "contact" && (
//             <>
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <Field
//                   label="Name"
//                   type="text"
//                   required
//                   placeholder="You"
//                   value={contactForm.name}
//                   onChange={updateField("name")}
//                 />
//                 <Field
//                   label="Email"
//                   type="email"
//                   required
//                   placeholder="you@company.com"
//                   value={contactForm.email}
//                   onChange={updateField("email")}
//                 />
//               </div>
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <Field
//                   label="Phone (optional)"
//                   type="tel"
//                   placeholder=""
//                   value={contactForm.phone}
//                   onChange={updateField("phone")}
//                 />
//                 <Field
//                   label="Subject"
//                   type="text"
//                   placeholder="What's this about?"
//                   value={contactForm.subject}
//                   onChange={updateField("subject")}
//                 />
//               </div>
//               <label className="block">
//                 <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
//                   Message
//                 </span>
//                 <textarea
//                   required
//                   minLength={10}
//                   rows={5}
//                   placeholder="Tell us a bit about the project and timeline…"
//                   value={contactForm.message}
//                   onChange={updateField("message")}
//                   className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
//                 />
//               </label>

//               <PillSelect
//                 label="Would you like to schedule a call?"
//                 value={contactForm.scheduleCall}
//                 onChange={(v) =>
//                   setContactForm((prev) => ({
//                     ...prev,
//                     scheduleCall: v,
//                     // Clear any picked slot when switching back to "no"
//                     // so a stale date/time can't sneak into submission.
//                     ...(v === "no" ? { date: "", time: "" } : {}),
//                   }))
//                 }
//                 options={[
//                   { value: "no", label: "No" },
//                   { value: "yes", label: "Yes" },
//                 ]}
//               />

//               {contactForm.scheduleCall === "yes" && (
//                 <>
//                   <div className="grid gap-5 sm:grid-cols-2">
//                     <div>
//                       <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
//                         Preferred date
//                       </span>
//                       <DatePicker value={contactForm.date} onChange={updateScheduleDate} min={todayISO()} />
//                     </div>
//                     <div>
//                       <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
//                         Preferred time
//                       </span>
//                       <TimePicker
//                         value={contactForm.time}
//                         onChange={updateScheduleTime}
//                         min={minTimeFor(contactForm.date)}
//                       />
//                     </div>
//                   </div>
//                   <label className="block">
//                     <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
//                       Anything we should know beforehand? (optional)
//                     </span>
//                     <textarea
//                       rows={3}
//                       placeholder="Project scope, goals, current stack…"
//                       value={contactForm.notes}
//                       onChange={updateField("notes")}
//                       className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
//                     />
//                   </label>
//                   <p className="text-xs text-ivory/40">
//                     Times are in your local timezone. We&apos;ll confirm the slot by email.
//                   </p>
//                 </>
//               )}
//             </>
//           )}

//           {mode === "audit" && (
//             <>
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <Field
//                   label="Company name"
//                   type="text"
//                   required
//                   placeholder="Acme Inc."
//                   value={auditForm.companyName}
//                   onChange={updateField("companyName")}
//                 />
//                 <Field
//                   label="Representative name"
//                   type="text"
//                   required
//                   placeholder="You"
//                   value={auditForm.repName}
//                   onChange={updateField("repName")}
//                 />
//               </div>

//               <div className="grid gap-5 sm:grid-cols-2">
//                 <Field
//                   label="Company email"
//                   type="email"
//                   required
//                   placeholder="you@company.com"
//                   value={auditForm.companyEmail}
//                   onChange={updateField("companyEmail")}
//                 />
//                 <Field
//                   label="Phone number"
//                   type="tel"
//                   required
//                   placeholder=""
//                   value={auditForm.phone}
//                   onChange={updateField("phone")}
//                 />
//               </div>

//               <div className="grid gap-5 sm:grid-cols-2">
//                 <Field
//                   label="Alternative number (optional)"
//                   type="tel"
//                   placeholder=""
//                   value={auditForm.altPhone}
//                   onChange={updateField("altPhone")}
//                 />
//                 <Field
//                   label="Website / app / product link"
//                   type="text"
//                   required
//                   placeholder="https://…"
//                   value={auditForm.productLink}
//                   onChange={updateField("productLink")}
//                 />
//               </div>

//               <label className="block">
//                 <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
//                   What is the current issue with the product that&apos;s observable to you?
//                 </span>
//                 <textarea
//                   required
//                   minLength={10}
//                   rows={4}
//                   placeholder="Describe what you're seeing…"
//                   value={auditForm.issue}
//                   onChange={updateField("issue")}
//                   className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
//                 />
//               </label>

//               <label className="block">
//                 <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
//                   Specific directions (optional)
//                 </span>
//                 <textarea
//                   rows={3}
//                   placeholder="Anything specific you'd like us to focus on…"
//                   value={auditForm.directions}
//                   onChange={updateField("directions")}
//                   className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
//                 />
//               </label>

//               {/* <PillSelect
//                 label="What form of interaction do you need?"
//                 value={auditForm.interactionType}
//                 onChange={(v) => setAuditForm((prev) => ({ ...prev, interactionType: v }))}
//                 options={[
//                   { value: "report", label: "Send me a report" },
//                   { value: "meeting", label: "Schedule a meeting with experts" },
//                   { value: "both", label: "Both" },
//                 ]}
//               /> */}
//               <PillSelect
//   label="What form of interaction do you need?"
//   value={auditForm.interactionType}
//   onChange={(v) => setAuditForm((prev) => ({ ...prev, interactionType: v }))}
//   layout="stack"
//   options={[
//     { value: "report", label: "Send me a report" },
//     { value: "meeting", label: "Schedule a meeting with experts" },
//     { value: "both", label: "Both" },
//   ]}
// />

//               <PillSelect
//                 label="How should we send the report?"
//                 value={auditForm.contactMethod}
//                 onChange={(v) => setAuditForm((prev) => ({ ...prev, contactMethod: v }))}
//                 options={[
//                   { value: "whatsapp", label: "WhatsApp" },
//                   { value: "email", label: "Email" },
//                   { value: "both", label: "Both" },
//                 ]}
//               />
//             </>
//           )}

//           <button
//             type="submit"
//             disabled={status === "submitting"}
//             className="group relative mt-2 w-full overflow-hidden rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-opacity disabled:opacity-60"
//           >
//             <span aria-hidden className="liquid-fill pointer-events-none absolute inset-0 bg-violet" />
//             <span className="relative z-10">
//               {status === "submitting"
//                 ? "Sending…"
//                 : mode === "audit"
//                 ? "Request audit"
//                 : contactForm.scheduleCall === "yes"
//                 ? "Confirm & schedule call"
//                 : "Send message"}
//             </span>
//           </button>

//           <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
//             {status === "success" && (
//               <span className="text-emerald-600">
//                 {mode === "audit"
//                   ? "Audit request sent — we'll be in touch shortly."
//                   : contactForm.scheduleCall === "yes"
//                   ? "Request sent — we'll confirm your slot by email shortly."
//                   : "Message sent — we'll be in touch soon."}
//               </span>
//             )}
//             {status === "error" && <span className="text-rose-600">{errorMsg}</span>}
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DatePicker from "@/components/Datepicker";
import TimePicker from "@/components/Timepicker";

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/kueaurex-solutions/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.86V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.44-2.16 2.96V21H9z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/kueaurexsol?igsi=NHlrOThycmxyaWwz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const EMPTY_CONTACT = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  scheduleCall: "no", // "yes" | "no"
  date: "",
  time: "",
  notes: "",
};
const EMPTY_AUDIT = {
  companyName: "",
  repName: "",
  companyEmail: "",
  phone: "",
  altPhone: "",
  productLink: "",
  issue: "",
  directions: "",
  interactionType: "", // "report" | "meeting" | "both"
  contactMethod: "", // "whatsapp" | "email" | "both"
};

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function minTimeFor(dateStr) {
  if (!dateStr || dateStr !== todayISO()) return undefined;
  const now = new Date();
  const roundedMinutes = Math.ceil(now.getMinutes() / 15) * 15;
  now.setMinutes(roundedMinutes, 0, 0);
  return now.toTimeString().slice(0, 5);
}

function Field({ label, className = "", ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">{label}</span>
      <input
        {...props}
        className={`w-full rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet ${className}`}
      />
    </label>
  );
}

function PillSelect({ label, value, onChange, options, layout = "row" }) {
  const alwaysStacked = layout === "stack";

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">{label}</span>
      <div
        className={
          alwaysStacked
            ? "flex flex-col gap-2 rounded-2xl border border-ink/10 bg-void p-1.5"
            : "flex flex-col gap-2 rounded-2xl border border-ink/10 bg-void p-1.5 sm:inline-flex sm:flex-row sm:flex-wrap sm:gap-0 sm:rounded-full sm:p-1"
        }
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={
              alwaysStacked
                ? `w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                    value === opt.value ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
                  }`
                : `w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:py-2 sm:text-center ${
                    value === opt.value ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
                  }`
            }
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ContactPageInner() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "audit" ? "audit" : "contact";

  const [mode, setMode] = useState(initialMode); // "contact" | "audit"
  const [contactForm, setContactForm] = useState(EMPTY_CONTACT);
  const [auditForm, setAuditForm] = useState(EMPTY_AUDIT);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const form = mode === "contact" ? contactForm : auditForm;
  const setForm = mode === "contact" ? setContactForm : setAuditForm;

  const updateField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const updateScheduleDate = (picked) => {
    const floorDate = todayISO();
    const nextDate = picked && picked < floorDate ? floorDate : picked;

    setContactForm((prev) => {
      const floorTime = minTimeFor(nextDate);
      const timeStillValid = !floorTime || !prev.time || prev.time >= floorTime;
      return { ...prev, date: nextDate, time: timeStillValid ? prev.time : "" };
    });
  };

  const updateScheduleTime = (picked) => {
    setContactForm((prev) => {
      const floorTime = minTimeFor(prev.date);
      const nextTime = floorTime && picked && picked < floorTime ? floorTime : picked;
      return { ...prev, time: nextTime };
    });
  };

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "contact" && contactForm.scheduleCall === "yes") {
      const when = new Date(`${contactForm.date}T${contactForm.time}`);
      if (
        !contactForm.date ||
        !contactForm.time ||
        Number.isNaN(when.getTime()) ||
        when.getTime() < Date.now()
      ) {
        setStatus("error");
        setErrorMsg("Pick a date and time that haven't passed yet.");
        return;
      }
    }

    if (mode === "audit") {
      if (!auditForm.interactionType) {
        setStatus("error");
        setErrorMsg("Let us know whether you'd like a report, a meeting, or both.");
        return;
      }
      if (!auditForm.contactMethod) {
        setStatus("error");
        setErrorMsg("Pick how we should send the report.");
        return;
      }
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: mode, ...form, website }),
      });
      const data = await res.json().catch(() => ({ ok: false, error: "Unexpected response." }));

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(mode === "contact" ? EMPTY_CONTACT : EMPTY_AUDIT);
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't reach the server. Check your connection and try again.");
    }
  };

  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-[6vw] py-24 md:grid-cols-2 md:py-32">
      {/* ---- left: signature "code window" illustration + copy ---- */}
      <div className="flex flex-col gap-10 ">
        <div className="relative w-full max-w-md">
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-violet/10 blur-2xl" />
          <div className="rounded-2xl bg-ink p-5 shadow-xl shadow-ink/10">
            <div className="flex items-center gap-1.5 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-[11px] tracking-[2px] text-white/30">
                new-message.ts
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-[13px] leading-relaxed">
              <p className="text-violet">
                const <span className="text-white/80">message</span> = {"{"}
              </p>
              <p className="pl-4 text-white/45">
                to: <span className="text-white/75">&quot;hello@kueaurex.com&quot;</span>,
              </p>
              <p className="pl-4 text-white/45">
                from: <span className="text-white/75">&quot;you@yourcompany.com&quot;</span>,
              </p>
              <p className="pl-4 text-white/45">
                status: <span className="text-emerald-300">&quot;sending…&quot;</span>
              </p>
              <p className="text-violet">{"}"}</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-full border border-ink/10 bg-void px-4 py-2 shadow-lg shadow-ink/10">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="whitespace-nowrap font-mono text-[11px] text-ivory/70">
              Usually replies within a day
            </span>
          </div>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] tracking-[3px] text-violet">GET IN TOUCH</p>
          <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ivory md:text-4xl">
            Tell us where you want to go. We&apos;ll figure out how to get you there.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ivory/60">
            Send a message — with a call on the calendar if you&apos;d like one — or
            request a technical audit of what you&apos;ve already built. Either
            way, a real person gets back to you — not an inbox.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-violet text-white transition-transform hover:scale-105"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ---- right: contact-us / technical-audit form ---- */}
      <div className="rounded-[2rem] border border-ink/10 bg-plum p-6 shadow-xl shadow-ink/5 md:p-8">
        <div className="mb-7 flex w-full flex-col gap-2 rounded-2xl border border-ink/10 bg-void p-1.5 sm:inline-flex sm:w-auto sm:flex-row sm:flex-wrap sm:gap-1 sm:rounded-full sm:p-1">
          {[
            { key: "contact", label: "Contact us" },
            { key: "audit", label: "Technical audit" },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => switchMode(t.key)}
              className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-colors sm:w-auto sm:rounded-full sm:px-4 sm:py-2 md:px-5 ${
                mode === t.key ? "bg-violet text-white" : "text-ivory/50 hover:text-ivory"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Company website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          {mode === "contact" && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  type="text"
                  required
                  placeholder="You"
                  value={contactForm.name}
                  onChange={updateField("name")}
                />
                <Field
                  label="Email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={contactForm.email}
                  onChange={updateField("email")}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Phone (optional)"
                  type="tel"
                  placeholder=""
                  value={contactForm.phone}
                  onChange={updateField("phone")}
                />
                <Field
                  label="Subject"
                  type="text"
                  placeholder="What's this about?"
                  value={contactForm.subject}
                  onChange={updateField("subject")}
                />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
                  Message
                </span>
                <textarea
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Tell us a bit about the project and timeline…"
                  value={contactForm.message}
                  onChange={updateField("message")}
                  className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
                />
              </label>

              <PillSelect
                label="Would you like to schedule a call?"
                value={contactForm.scheduleCall}
                onChange={(v) =>
                  setContactForm((prev) => ({
                    ...prev,
                    scheduleCall: v,
                    ...(v === "no" ? { date: "", time: "" } : {}),
                  }))
                }
                options={[
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                ]}
              />

              {contactForm.scheduleCall === "yes" && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
                        Preferred date
                      </span>
                      <DatePicker value={contactForm.date} onChange={updateScheduleDate} min={todayISO()} />
                    </div>
                    <div>
                      <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
                        Preferred time
                      </span>
                      <TimePicker
                        value={contactForm.time}
                        onChange={updateScheduleTime}
                        min={minTimeFor(contactForm.date)}
                      />
                    </div>
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
                      Anything we should know beforehand? (optional)
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Project scope, goals, current stack…"
                      value={contactForm.notes}
                      onChange={updateField("notes")}
                      className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
                    />
                  </label>
                  <p className="text-xs text-ivory/40">
                    Times are in your local timezone. We&apos;ll confirm the slot by email.
                  </p>
                </>
              )}
            </>
          )}

          {mode === "audit" && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Company name"
                  type="text"
                  required
                  placeholder="Acme Inc."
                  value={auditForm.companyName}
                  onChange={updateField("companyName")}
                />
                <Field
                  label="Representative name"
                  type="text"
                  required
                  placeholder="You"
                  value={auditForm.repName}
                  onChange={updateField("repName")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Company email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={auditForm.companyEmail}
                  onChange={updateField("companyEmail")}
                />
                <Field
                  label="Phone number"
                  type="tel"
                  required
                  placeholder=""
                  value={auditForm.phone}
                  onChange={updateField("phone")}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Alternative number (optional)"
                  type="tel"
                  placeholder=""
                  value={auditForm.altPhone}
                  onChange={updateField("altPhone")}
                />
                <Field
                  label="Website / app / product link"
                  type="text"
                  required
                  placeholder="https://…"
                  value={auditForm.productLink}
                  onChange={updateField("productLink")}
                />
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
                  What is the current issue with the product that&apos;s observable to you?
                </span>
                <textarea
                  required
                  minLength={10}
                  rows={4}
                  placeholder="Describe what you're seeing…"
                  value={auditForm.issue}
                  onChange={updateField("issue")}
                  className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium tracking-wide text-ivory/50">
                  Specific directions (optional)
                </span>
                <textarea
                  rows={3}
                  placeholder="Anything specific you'd like us to focus on…"
                  value={auditForm.directions}
                  onChange={updateField("directions")}
                  className="w-full resize-none rounded-xl border border-ink/10 bg-void px-4 py-3 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-violet"
                />
              </label>

              <PillSelect
                label="What form of interaction do you need?"
                value={auditForm.interactionType}
                onChange={(v) => setAuditForm((prev) => ({ ...prev, interactionType: v }))}
                layout="stack"
                options={[
                  { value: "report", label: "Send me a report" },
                  { value: "meeting", label: "Schedule a meeting with experts" },
                  { value: "both", label: "Both" },
                ]}
              />

              <PillSelect
                label="How should we send the report?"
                value={auditForm.contactMethod}
                onChange={(v) => setAuditForm((prev) => ({ ...prev, contactMethod: v }))}
                options={[
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "email", label: "Email" },
                  { value: "both", label: "Both" },
                ]}
              />
            </>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group relative mt-2 w-full overflow-hidden rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-opacity disabled:opacity-60"
          >
            <span aria-hidden className="liquid-fill pointer-events-none absolute inset-0 bg-violet" />
            <span className="relative z-10">
              {status === "submitting"
                ? "Sending…"
                : mode === "audit"
                ? "Request audit"
                : contactForm.scheduleCall === "yes"
                ? "Confirm & schedule call"
                : "Send message"}
            </span>
          </button>

          <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm">
            {status === "success" && (
              <span className="text-emerald-600">
                {mode === "audit"
                  ? "Audit request sent — we'll be in touch shortly."
                  : contactForm.scheduleCall === "yes"
                  ? "Request sent — we'll confirm your slot by email shortly."
                  : "Message sent — we'll be in touch soon."}
              </span>
            )}
            {status === "error" && <span className="text-rose-600">{errorMsg}</span>}
          </p>
        </form>
      </div>
    </section>
  );
}

export default function ContactUsPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}