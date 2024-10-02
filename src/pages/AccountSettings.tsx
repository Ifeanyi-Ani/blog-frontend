import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../features/users/userSlice";
import { LoadingState } from "../ui/shared/LoadingState";
import { tabs } from "../constant";
import { Profile } from "../features/accountSettings/profile/profile";
import { ProfileForm } from "../features/accountSettings/profile/form";
import { ChangePassword } from "../features/accountSettings/security/ChangePassword";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserQuery(userId);

  if (isLoading) {
    return <LoadingState />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <Profile user={user}>
            <ProfileForm user={user} userId={userId} />
          </Profile>
        );
      case "security":
        return <ChangePassword />;
      default:
        return (
          <div className="text-electricCyan-300">
            Content for {activeTab} tab
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-customBlue-950 via-customBlue-900 to-customBlue-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-customBlue-900 rounded-xl p-8 shadow-xl border border-neonPink-700/30">
          <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neonPink-400 to-electricCyan-400">
            Account Settings
          </h1>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-electricCyan-600 text-customBlue-900"
                        : "text-electricCyan-300 hover:bg-customBlue-800"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="w-full md:w-3/4 bg-customBlue-800 rounded-lg p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
