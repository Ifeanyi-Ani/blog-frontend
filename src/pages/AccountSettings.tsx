import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetUserQuery } from '../features/users/userSlice';
import { LoadingState } from '../ui/shared/LoadingState';
import { tabs } from '../constant';
import { Profile } from '../features/accountSettings/profile/profile';
import { ProfileForm } from '../features/accountSettings/profile/form';
import { ChangePassword } from '../features/accountSettings/security/ChangePassword';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { userId } = useParams();
  const { data: user, isLoading } = useGetUserQuery(userId);

  if (isLoading) {
    return <LoadingState />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <Profile user={user}>
            <ProfileForm user={user} userId={userId as string} />
          </Profile>
        );
      case 'security':
        return <ChangePassword />;
      default:
        return <div className="text-primary">Content for {activeTab} tab</div>;
    }
  };

  return (
    <div className="h-full bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="">
          <h1 className="mb-8 text-4xl font-bold text-primary/70">
            Account Settings
          </h1>
          <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
            <div className="w-full md:w-1/4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="h-full w-full overflow-y-scroll rounded-lg bg-card p-6 shadow-inner md:w-3/4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
