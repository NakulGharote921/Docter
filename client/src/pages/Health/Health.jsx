import BMICalculator from "../../components/health/BMICalculator";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../hooks/useAuth";
import { saveBmiRecord } from "../../services/healthHubService";

export default function Health() {
  const { user } = useAuth();

  return (
    <div className="hub-page">
      <SectionHeader
        eyebrow="Health"
        title="Measure and monitor your baseline"
        description="The BMI calculator stores height, weight, and BMI back into the existing Firebase Realtime Database."
      />

      <div className="hub-grid two-column">
        <BMICalculator
          initialHeight={175}
          initialWeight={72}
          onSave={(payload) => saveBmiRecord(user.uid, payload)}
        />

        <section className="hub-card">
          <div className="hub-card-header">
            <h3>Health history</h3>
            <span>Next step</span>
          </div>
          <p className="hub-empty-state">
            This page is prepared for chart integration later. The current data
            model now stores reusable health metrics in the
            users/{`<uid>`}/health path.
          </p>
        </section>
      </div>
    </div>
  );
}
