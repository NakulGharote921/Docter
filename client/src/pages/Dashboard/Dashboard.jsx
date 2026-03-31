import { useEffect, useState } from "react";
import DailyWorkoutMini from "../../components/dashboard/DailyWorkoutMini";
import DietProgress from "../../components/dashboard/DietProgress";
import HealthSummaryCard from "../../components/dashboard/HealthSummaryCard";
import UpcomingAppointmentsList from "../../components/dashboard/UpcomingAppointmentsList";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../hooks/useAuth";
import { mealPlan, workoutPlans } from "../../services/healthHubData";
import { getUserDashboardSnapshot } from "../../services/healthHubService";
import {
  getBmiCategory,
  getTodayKey,
  getWaterProgress,
} from "../../utils/health";

export default function Dashboard() {
  const { user } = useAuth();
  const [snapshot, setSnapshot] = useState({
    health: {},
    steps: {},
    appointments: [],
  });

  useEffect(() => {
    async function loadDashboard() {
      if (!user) {
        return;
      }

      const nextSnapshot = await getUserDashboardSnapshot(user.uid);
      setSnapshot(nextSnapshot);
    }

    loadDashboard();
  }, [user]);

  const todaysSteps = snapshot.steps[getTodayKey()] || 0;
  const waterIntake = snapshot.health.waterIntake || 0;

  return (
    <div className="hub-page">
      <SectionHeader
        eyebrow="Overview"
        title={`Welcome back, ${user?.displayName || "there"}`}
        description="Track appointments, health metrics, meals, and movement from one place."
      />

      <div className="hub-grid summary-grid">
        <HealthSummaryCard
          label="Current BMI"
          value={snapshot.health.bmi || "--"}
          accent="#156f5c"
          helper={getBmiCategory(snapshot.health.bmi)}
        />
        <HealthSummaryCard
          label="Water intake"
          value={`${waterIntake}/8`}
          accent="#0b6bcb"
          helper="Daily hydration target"
        />
        <HealthSummaryCard
          label="Today steps"
          value={todaysSteps}
          accent="#c45a10"
          helper="Movement logged today"
        />
        <HealthSummaryCard
          label="Appointments"
          value={snapshot.appointments.length}
          accent="#8a3ffc"
          helper="Upcoming care sessions"
        />
      </div>

      <div className="hub-grid dashboard-grid">
        <UpcomingAppointmentsList appointments={snapshot.appointments} />
        <DailyWorkoutMini items={workoutPlans.beginner} />
        <DietProgress
          waterProgress={getWaterProgress(waterIntake)}
          mealsCompleted={3}
          totalMeals={mealPlan.length}
        />
      </div>
    </div>
  );
}
