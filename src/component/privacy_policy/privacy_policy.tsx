import Footer from "../common/footer";
import TopBar from "../common/topbar";
import PrivacyPolicyBottom from "./privacy_policy_bottom";
import PrivacyPolicyTop from "./privacy_policy_top";

export default function PrivacyPolicy() {
  return (
    <div className="">
      <TopBar />
      <PrivacyPolicyTop/>
      <PrivacyPolicyBottom/>
      <Footer />
    </div>
  );
}
