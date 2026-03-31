import MealPlanCard from "../../components/diet/MealPlanCard";
import WaterIntakeTracker from "../../components/diet/WaterIntakeTracker";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../hooks/useAuth";
import { mealPlan } from "../../services/healthHubData";
import { saveWaterIntake } from "../../services/healthHubService";

export default function Diet() {
  const { user } = useAuth();

  return (
    <div className="hub-page">
      <SectionHeader
        eyebrow="Diet"
        title="Nutrition planner"
        description="Review a simple meal outline and keep your water intake synced to Firebase."
      />

      <div className="hub-page-stack">
        <div className="hub-grid two-column">
          {mealPlan.map((item) => (
            <MealPlanCard key={item.meal} item={item} />
          ))}
        </div>

        <WaterIntakeTracker
          initialValue={4}
          onSave={(value) => saveWaterIntake(user.uid, value)}
        />
      </div>
    </div>
  );
}
