import { GraduationCap, BookOpenCheck, Compass } from "lucide-react";
import Section from "../components/Section.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

// The three "why" cards.
const reasons = [
	{
		icon: GraduationCap,
		label: "Training",
		title: "Experienced instructors",
		text: "Learn through subject-focused sessions led by an experienced teaching team.",
	},
	{
		icon: BookOpenCheck,
		label: "Learning",
		title: "Structured academic support",
		text: "Build a consistent study routine with guided learning and digital resources.",
	},
	{
		icon: Compass,
		label: "Guidance",
		title: "Career pathway counselling",
		text: "Understand the stages, requirements and decisions involved in pilot training.",
	},
];

function WhyWayForSky() {
	return (
		<Section
			id="why"
			className="border-y border-[#173956] bg-[#071D36] text-white"
		>
			<SectionHeading
				className="mb-7 sm:mb-10"
				eyebrow="Why WayForSky"
				title="Aviation guidance beyond the classroom."
				text="We bring learning, counselling and pathway guidance together so students can make informed decisions about their aviation journey."
				light
			/>

			<div className="grid gap-3 sm:gap-4 md:grid-cols-3">
				{reasons.map((reason) => {
					const Icon = reason.icon;

					return (
						<article
							key={reason.title}
							className="relative overflow-hidden rounded-2xl border-2 border-[#d9e4ec] bg-white p-5 shadow-[0_6px_20px_rgba(25,70,110,0.08)] sm:p-6"
						>
							<span className="absolute left-0 top-0 h-1 w-full bg-brand/80" />

							<div className="flex items-center gap-3">
								<span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#cfe0eb] bg-ice text-brand">
									<Icon size={21} strokeWidth={2.2} />
								</span>
								<span className="rounded-full bg-[#edf5f9] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-brand">
									{reason.label}
								</span>
							</div>

							<h3 className="mb-2 mt-4 border-l-4 border-brand pl-3 text-[17px] font-extrabold leading-tight text-navy sm:text-[18px]">
								{reason.title}
							</h3>
							<p className="text-[13px] leading-6 text-muted">
								{reason.text}
							</p>
						</article>
					);
				})}
			</div>
		</Section>
	);
}

export default WhyWayForSky;
