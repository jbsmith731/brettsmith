import {
  Menu,
  type MenuGroupLabelProps,
  type MenuItemProps,
  type MenuPopupProps,
  type MenuPositionerProps,
} from '@base-ui/react/menu';
import { twMerge } from 'tailwind-merge';
import { label as labelStyle, text } from '~/styles/text.styles';

export const DropdownMenuRoot = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;
export const DropdownMenuPortal = Menu.Portal;
export const DropdownMenuGroup = Menu.Group;
export const DropdownMenuRadioGroup = Menu.RadioGroup;
export const DropdownMenuCheckboxItemIndicator = Menu.CheckboxItemIndicator;
export const DropdownMenuRadioItemIndicator = Menu.RadioItemIndicator;

interface PositionerProps extends MenuPositionerProps {
  className?: string;
}

export function DropdownMenuPositioner({
  className,
  children,
  ...rest
}: PositionerProps) {
  return (
    <Menu.Positioner className={twMerge('z-50', className)} {...rest}>
      {children}
    </Menu.Positioner>
  );
}

interface PopupProps extends MenuPopupProps {
  className?: string;
}

export function DropdownMenuPopup({
  children,
  className,
  ...rest
}: PopupProps) {
  return (
    <Menu.Popup
      className={twMerge(
        'bg-surface border border-border rounded-lg shadow-lg p-1 min-w-40',
        'outline-none',
        'transition-[opacity,transform] duration-150 ease-out',
        'data-starting-style:opacity-0 data-starting-style:scale-95',
        'data-ending-style:opacity-0 data-ending-style:scale-95',
        className,
      )}
      {...rest}
    >
      {children}
    </Menu.Popup>
  );
}

interface ItemProps extends MenuItemProps {
  className?: string;
}

export function DropdownMenuItem({ children, className, ...rest }: ItemProps) {
  return (
    <Menu.Item
      className={twMerge(
        text({ size: 'sm' }),
        'flex items-center gap-2 px-3 py-1.5 rounded-md',
        'cursor-pointer select-none outline-none',
        'data-highlighted:bg-paper-200',
        'active:bg-paper-300',
        'data-disabled:opacity-50 data-disabled:pointer-events-none',
        'transition-colors duration-100',
        className,
      )}
      {...rest}
    >
      {children}
    </Menu.Item>
  );
}

interface GroupLabelProps extends MenuGroupLabelProps {
  className?: string;
}

export function DropdownMenuGroupLabel({
  children,
  className,
  ...rest
}: GroupLabelProps) {
  return (
    <Menu.GroupLabel
      className={twMerge(
        labelStyle,
        text({ color: 'secondary' }),
        'px-3 py-1 mt-1',
        className,
      )}
      {...rest}
    >
      {children}
    </Menu.GroupLabel>
  );
}

interface SeparatorProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string;
}

export function DropdownMenuSeparator({ className, ...rest }: SeparatorProps) {
  return (
    <Menu.Separator
      className={twMerge('h-px bg-border my-1 -mx-1', className)}
      {...rest}
    />
  );
}

interface CheckboxItemProps extends React.ComponentPropsWithoutRef<
  typeof Menu.CheckboxItem
> {
  className?: string;
}

export function DropdownMenuCheckboxItem({
  children,
  className,
  ...rest
}: CheckboxItemProps) {
  return (
    <Menu.CheckboxItem
      className={twMerge(
        text({ size: 'sm' }),
        'flex items-center gap-2 px-3 py-1.5 rounded-md',
        'cursor-pointer select-none outline-none',
        'data-highlighted:bg-paper-200',
        'active:bg-paper-300',
        'data-disabled:opacity-50 data-disabled:pointer-events-none',
        'transition-colors duration-100',
        className,
      )}
      {...rest}
    >
      {children}
    </Menu.CheckboxItem>
  );
}

interface RadioItemProps extends React.ComponentPropsWithoutRef<
  typeof Menu.RadioItem
> {
  className?: string;
}

export function DropdownMenuRadioItem({
  children,
  className,
  ...rest
}: RadioItemProps) {
  return (
    <Menu.RadioItem
      className={twMerge(
        text({ size: 'sm' }),
        'flex items-center gap-2 px-3 py-1.5 rounded-md',
        'cursor-pointer select-none outline-none',
        'data-highlighted:bg-paper-200',
        'active:bg-paper-300',
        'data-disabled:opacity-50 data-disabled:pointer-events-none',
        'transition-colors duration-100',
        className,
      )}
      {...rest}
    >
      {children}
    </Menu.RadioItem>
  );
}
