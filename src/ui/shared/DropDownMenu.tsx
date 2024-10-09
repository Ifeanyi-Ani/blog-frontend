import * as React from 'react';
import { Menu, MenuButton, Transition } from '@headlessui/react';
import { MoreHorizontal } from 'lucide-react';
import { ReactNode } from 'react';
interface DropDownMenuProps {
  children: ReactNode;
}
export const DropDownMenu: React.FC<DropDownMenuProps> = ({ children }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="text-electricCyan-400 transition-colors duration-200 hover:text-electricCyan-300">
        <MoreHorizontal />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {children}
      </Transition>
    </Menu>
  );
};
