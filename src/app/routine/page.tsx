"use client";

import { useState, useEffect } from "react";
import { CheckSquare, Square, RotateCcw, Sparkles, Sun, Sunset, Moon, Clock, Award } from "lucide-react";

interface RoutineTask {
  id: string;
  timeSlot: "morning" | "afternoon" | "evening" | "night";
  title: string;
  count: string;
  hint: string;
}

const ROUTINE_TASKS: RoutineTask[] = [
  // Morning
  {
    id: "m_fajr_prayer",
    timeSlot: "morning",
    title: "ফজরের ফরজ সালাত সময়মতো আদায় করা",
    count: "ফরজ",
    hint: "রাসূলুল্লাহ (ﷺ) বলেছেন: যে ব্যক্তি ফজরের সালাত আদায় করল, সে আল্লাহর জিম্মায় (নিরাপত্তা বলয়ে) থাকল।",
  },
  {
    id: "m_ayatul_kursi",
    timeSlot: "morning",
    title: "সকালের আয়াতুল কুরসী পাঠ",
    count: "১ বার",
    hint: "সকালে পড়লে সন্ধ্যা পর্যন্ত শয়তানের আক্রমণ থেকে মুক্ত থাকা যায়।",
  },
  {
    id: "m_three_quls",
    timeSlot: "morning",
    title: "সূরা ইখলাস, ফালাক ও নাস পাঠ",
    count: "৩ বার",
    hint: "সকালে ৩ বার পাঠ করলে সকল প্রকার অনিষ্ট ও বিপদ থেকে যথেষ্ট হবে।",
  },
  {
    id: "m_bismillah_dua",
    timeSlot: "morning",
    title: "বিসমিল্লাহিল্লাযী লা ইয়াদুররু... দোয়া",
    count: "৩ বার",
    hint: "আসমান ও যমীনের কোনো অনিষ্ট ক্ষতি করতে পারবে না।",
  },
  {
    id: "m_sayyidul_istighfar",
    timeSlot: "morning",
    title: "সাইয়্যিদুল ইস্তিগফার পাঠ",
    count: "১ বার",
    hint: "দিনের বেলা দৃঢ় বিশ্বাসের সাথে পড়লে এবং ঐদিন মারা গেলে জান্নাতী হবেন।",
  },

  // Afternoon
  {
    id: "a_after_salah_dhikr",
    timeSlot: "afternoon",
    title: "যোহর ও আসরের সালাতের পর মাসনুন তাসবীহ",
    count: "প্রতি সালাতের পর",
    hint: "সুবহানাল্লাহ ৩৩, আলহামদুলিল্লাহ ৩৩, আল্লাহু আকবার ৩৪ বার।",
  },
  {
    id: "a_quran_recitation",
    timeSlot: "afternoon",
    title: "দৈনিক কুরআন তিলাওয়াত (কমপক্ষে ১-২ রুকু)",
    count: "প্রতিদিন",
    hint: "কুরআন তিলাওয়াত দিলে ও ঘরে রহমতের কারণ।",
  },

  // Evening
  {
    id: "e_maghrib_dhikr",
    timeSlot: "evening",
    title: "মাগরিবের পর সন্ধ্যার ৩ কুল ও আয়াতুল কুরসী",
    count: "৩ বার",
    hint: "সারারাত শয়তানের চক্রান্ত থেকে নিরাপত্তার জন্য।",
  },
  {
    id: "e_aoodhu_bikalimatillah",
    timeSlot: "evening",
    title: "আউযু বিকালিমা-তিল্লাহিত তা-ম্মা-তি মিন শাররি মা খালাক্ব",
    count: "৩ বার",
    hint: "রাতের বিষাক্ত কীট বা মাখলুকের অনিষ্ট থেকে সুরক্ষা।",
  },
  {
    id: "e_hasbiyallah",
    timeSlot: "evening",
    title: "হাসবিয়াল্লাহু লা ইলাহা ইল্লা হুয়া ‘আলাইহি তাওয়াক্কালতু...",
    count: "৭ বার",
    hint: "দুনিয়া ও আখেরাতের সকল দুশ্চিন্তা দূর করার জন্য যথেষ্ট।",
  },

  // Night
  {
    id: "n_sleep_wudu",
    timeSlot: "night",
    title: "অযু অবস্থায় এবং বিছানা ৩ বার ঝেড়ে শোয়া",
    count: "সুন্নাহ",
    hint: "অযু অবস্থায় ঘুমালে একজন ফেরেশতা সারারাত পাহারা দেয়।",
  },
  {
    id: "n_baqarah_last_two",
    timeSlot: "night",
    title: "সূরা বাকারার শেষ দুই আয়াত (২৮৫-২৮৬) পাঠ",
    count: "১ বার",
    hint: "রাতের যাবতীয় বালা-মুসিবত থেকে বাঁচার জন্য যথেষ্ট।",
  },
  {
    id: "n_three_qul_blow",
    timeSlot: "night",
    title: "৩ কুল পড়ে দুই হাতে ফুঁ দিয়ে সারা শরীরে হাত বুলানো",
    count: "৩ বার",
    hint: "রাসূলুল্লাহ (ﷺ) প্রতি রাতে ঘুমানোর পূর্বে এই আমল করতেন।",
  },
  {
    id: "n_sleep_dua",
    timeSlot: "night",
    title: "ঘুমানোর মাসনুন দোয়া পাঠ",
    count: "১ বার",
    hint: "আল্লাহুম্মা বিসমিকা আমূতু ওয়া আহ্ইয়া।",
  },
];

export default function RoutinePage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const saved = localStorage.getItem("sunnahlife_daily_routine");
    if (saved) {
      try {
        setCompletedIds(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const toggleTask = (id: string) => {
    setCompletedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("sunnahlife_daily_routine", JSON.stringify(updated));
      return updated;
    });
  };

  const handleReset = () => {
    if (confirm("আপনি কি আজকের সমস্ত আমলের ট্র্যাকার রিসেট করতে চান?")) {
      setCompletedIds([]);
      localStorage.removeItem("sunnahlife_daily_routine");
    }
  };

  const totalTasks = ROUTINE_TASKS.length;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const filteredTasks =
    activeFilter === "all"
      ? ROUTINE_TASKS
      : ROUTINE_TASKS.filter((t) => t.timeSlot === activeFilter);

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006B5B]/10 text-[#006B5B] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>দৈনন্দিন সুন্নাহ হিফয ট্র্যাকার</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#004D40] tracking-tight">
          দৈনন্দিন রুটিন ও আত্মরক্ষা ট্র্যাকার
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          প্রতিদিন সকাল, দুপুর, সন্ধ্যা ও রাতের মাসনুন আমলগুলো সম্পন্ন করার পর টিক দিন। আমলগুলো নিয়মিত বজায় রাখলে আল্লাহর রহমতে শয়তানী আক্রমণ ও বদনজর থেকে স্থায়ী নিরাপত্তা পাওয়া যায়।
        </p>
      </div>

      {/* Progress Bar Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#006B5B]/15 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4A017]" />
            <span className="text-sm font-bold text-gray-900">আজকের আমলের অগ্রগতি:</span>
          </div>
          <span className="text-sm font-extrabold text-[#006B5B]">
            {progressPercent}% সম্পন্ন ({completedCount}/{totalTasks})
          </span>
        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#006B5B] to-[#D4A017] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>{progressPercent === 100 ? "মাশাআল্লাহ! আজকের সমস্ত আমল সম্পন্ন হয়েছে।" : "নিয়মিত আমল ঈমান ও শরীরকে সুরক্ষিত রাখে।"}</span>
          {completedCount > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              নতুন দিনের জন্য রিসেট
            </button>
          )}
        </div>
      </div>

      {/* Time Slot Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {[
          { id: "all", label: "সকল আমল", icon: Sparkles },
          { id: "morning", label: "সকাল (ফজর)", icon: Sun },
          { id: "afternoon", label: "দুপুর / আসর", icon: Clock },
          { id: "evening", label: "সন্ধ্যা (মাগরিব)", icon: Sunset },
          { id: "night", label: "রাত (ঘুমানোর পূর্বে)", icon: Moon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Task Checklist */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const isDone = completedIds.includes(task.id);
          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                isDone
                  ? "bg-[#006B5B]/5 border-[#006B5B] opacity-90 shadow-2xs"
                  : "bg-white border-gray-200 hover:border-[#006B5B]/40 hover:bg-[#FAFAF7]"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-[#006B5B]" />
                ) : (
                  <Square className="w-5 h-5 text-gray-300" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3
                    className={`text-sm md:text-base font-semibold ${
                      isDone ? "line-through text-gray-500" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h3>
                  <span className="text-[11px] font-bold bg-[#D4A017]/15 text-[#B3830D] px-2 py-0.5 rounded-md">
                    {task.count}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {task.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
