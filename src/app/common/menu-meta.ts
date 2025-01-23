export type MenuItemType = {
  key: string
  label: string
  isTitle?: boolean
  icon?: string
  url?: string
  badge?: {
    variant: string
    text: string
  }
  parentKey?: string
  isDisabled?: boolean
  collapsed?: boolean
  children?: MenuItemType[]
}

export type SubMenus = {
  item: MenuItemType
  linkClassName?: string
  subMenuClassName?: string
  activeMenuItems?: Array<string>
  toggleMenu?: (item: MenuItemType, status: boolean) => void
  className?: string
}
export type TabMenuItem = {
  index: number
  name: string
  icon: string
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'menu',
    label: 'MENU',
    isTitle: true,
  },
  {
    key: 'reviews',
    label: 'Reviews',
    icon: 'ri-chat-quote-line',
    url: '/',
  },
  {
    key: 'chats',
    label: 'Chats',
    icon: 'ri-chat-quote-line',
    url: '/chats',
  },
]
