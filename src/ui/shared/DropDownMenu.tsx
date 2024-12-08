import * as React from 'react';
import { Menu, MenuButton, Transition } from '@headlessui/react';
import { MoreHorizontal } from 'lucide-react';
import { ReactNode } from 'react';
interface DropDownMenuProps {
  children: ReactNode;
}
export const DropDownMenu: React.FC<DropDownMenuProps> = ({ children }) => {
  return (
    <Menu as="div" className="">
      <MenuButton className="absolute right-4 top-4">
        <MoreHorizontal />
      </MenuButton>
      {children}
    </Menu>
  );
};
