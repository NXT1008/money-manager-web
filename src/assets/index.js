import { Coins, FunnelPlus, LayoutDashboard, List, Wallet } from 'lucide-react'
import logo from '../assets/bg.png'
import login_bg from '../assets/bg.png'

export const assets = {
  logo,
  login_bg,
}

export const SIDE_BAR_DATA = [
  {
    id: '01',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    id: '02',
    label: 'Category',
    icon: List,
    path: '/category',
  },
  {
    id: '03',
    label: 'Income',
    icon: Wallet,
    path: '/income',
  },
  {
    id: '04',
    label: 'Expense',
    icon: Coins,
    path: '/expense',
  },
  {
    id: '05',
    label: 'Filter',
    icon: FunnelPlus,
    path: '/filter',
  },
]
