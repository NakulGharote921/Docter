import { useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import StepTrackerUI from "../../components/fitness/StepTrackerUI";
import WorkoutList from "../../components/fitness/WorkoutList";
import WorkoutPlanPicker from "../../components/fitness/WorkoutPlanPicker";
import { useAuth } from "../../hooks/useAuth";
import { workoutPlans } from "../../services/healthHubData";
import { saveDailySteps } from "../../services/healthHubService";

export default function Fitness() {
  const { user } = useAuth();
  const [level, setLevel] = useState("beginner");

  return (
    <div className="hub-page">
      <SectionHeader
        eyebrow="Fitness"
        title="Choose a workout path"
        description="Switch training intensity, review the day&apos;s blocks, and update your movement progress."
      />

      <div className="hub-page-stack">
        <section className="hub-card">
          <div className="hub-card-header">
            <h3>Workout plan picker</h3>
            <span>Adaptive training levels</span>
          </div>
          <WorkoutPlanPicker selectedLevel={level} onChange={setLevel} />
        </section>

        <WorkoutList items={workoutPlans[level]} />

        <StepTrackerUI
          initialSteps={8500}
          onSave={(steps) => saveDailySteps(user.uid, steps)}
        />
      </div>
    </div>
  );
}
