import {
  Home,
  Database,
  Compass,
  Music2,
  Disc,
  Image,
  Users,
  Search,
  BookHeart,
  BookOpen,
  Heart,
  Package,
  ShoppingBag,
  Truck,
  CreditCard,
  Inbox,
  User,
  Settings,
  MessageSquare,
} from "lucide-react";

export const THEMES = {
  red: { name: "Vermelho", hex: "#dc2626" },
  pink: { name: "Rosa", hex: "#ec4899" },
  purple: { name: "Lavanda", hex: "#a855f7" },
  blue: { name: "Azul", hex: "#3b82f6" },
  mint: { name: "Menta", hex: "#14b8a6" },
  orange: { name: "Laranja", hex: "#f97316" },
  yellow: { name: "Amarelo", hex: "#eab308" },
  black: { name: "Obsidiana", hex: "#334155" },
};

export const NAV_ITEMS = [
  { type: "link", icon: Home, label: "Início", path: "/" },
  {
    type: "category",
    icon: Database,
    label: "Catálogo",
    id: "catalog",
    items: [
      { label: "Explorar Tudo", path: "/catalog", icon: Compass },
      { label: "Artistas", path: "/catalog?filter=artist", icon: Music2 },
      { label: "Lançamentos", path: "/catalog?filter=release", icon: Disc },
      { label: "Photocards", path: "/catalog?filter=photocard", icon: Image },
    ],
  },
  {
    type: "category",
    icon: Users,
    label: "Comunidade",
    id: "community",
    items: [
      { label: "Encontrar Membros", path: "/community/find", icon: Search },
    ],
  },
  {
    type: "category",
    icon: BookHeart,
    label: "Minha Coleção",
    id: "collection",
    items: [
      {
        label: "Fichário (Binder)",
        path: "/collection/binder",
        icon: BookOpen,
      },
      { label: "Lista de Desejos", path: "/collection/wishlist", icon: Heart },
    ],
  },
  {
    type: "category",
    icon: Package,
    label: "Gerenciador de Compras",
    id: "purchases",
    items: [
      { label: "Compras", path: "/purchases", icon: ShoppingBag },
      { label: "Group Orders (GO)", path: "/purchases/gos", icon: Users },
      { label: "A Caminho", path: "/purchases/otw", icon: Truck },
      { label: "Recebidos", path: "/purchases/received", icon: Home },
    ],
  },
  { type: "link", icon: CreditCard, label: "Pagamentos", path: "/payments" },
  { type: "link", icon: Inbox, label: "Notificações", path: "/inbox" },
  { type: "link", icon: User, label: "Meu Perfil", path: "/profile" },
  { type: "link", icon: Settings, label: "Configurações", path: "/settings" },
];

export const MOCK_NOTIFS = [
  {
    id: 1,
    title: "Atualização de GO",
    desc: "[SKZ 5-STAR] chegou no endereço coreano!",
    time: "2m atrás",
    unread: true,
    icon: Package,
  },
  {
    id: 2,
    title: "Nova Oferta de Troca",
    desc: "@stay_tiny quer trocar pelo seu PC da Minnie",
    time: "1h atrás",
    unread: true,
    icon: MessageSquare,
  },
  {
    id: 3,
    title: "Alerta de Wishlist",
    desc: "Um POB raro do Hyunjin acabou de ser listado por R$75",
    time: "3h atrás",
    unread: false,
    icon: Heart,
  },
];

export const MOCK_PAYMENTS = [
  {
    id: 1,
    item: "Stray Kids ROCK-STAR GO (EMS)",
    type: "Pagamento de GO",
    amount: "R$ 125,00",
    due: "28/02/2024",
    status: "atrasado",
    seller: "@stay_ville_GOs",
    image: "https://i.scdn.co/image/ab67616d0000b273a68177ff385d1c8ec5283f8b",
  },
  {
    id: 2,
    item: "LE SSERAFIM Photocard Set",
    type: "Compra Direta",
    amount: "R$ 89,90",
    due: "15/03/2024",
    status: "pendente",
    seller: "@fearnot_collect",
    image: "https://placehold.co/300x300/eee/333?text=LE+SSERAFIM",
  },
  {
    id: 3,
    item: "BTS Proof Album",
    type: "Pagamento de GO",
    amount: "R$ 210,00",
    due: "10/03/2024",
    status: "pago",
    seller: "@army_go_manager",
    image: "https://i.scdn.co/image/ab67616d0000b27317db30ce3f081d6818a8be49",
  },
];

export const MOCK_CATALOG = [
  {
    id: "a1",
    type: "artist",
    name: "Stray Kids",
    subtitle: "JYP Entertainment",
    image:
      "https://pbs.twimg.com/profile_images/1979896696042651648/x3mvDchl_400x400.jpg",
    tags: ["Boy Group", "8 Membros"],
  },
  {
    id: "a2",
    type: "artist",
    name: "LE SSERAFIM",
    subtitle: "SOURCE MUSIC",
    image:
      "httpsag://pbs.twimg.com/profile_images/1781779889024110592/2nLrO2Vz_400x400.jpg",
    tags: ["Girl Group", "5 Membros"],
  },
  {
    id: "al1",
    type: "release",
    name: "5-STAR",
    subtitle: "Stray Kids",
    image: "https://i.scdn.co/image/ab67616d0000b273e77ba0f577555d3472893f98",
    tags: ["2023", "Full Album"],
  },
  {
    id: "al2",
    type: "release",
    name: "EASY",
    subtitle: "LE SSERAFIM",
    image: "https://i.scdn.co/image/ab67616d0000b273210d2d3f1796919464c6ade8",
    tags: ["2024", "Mini Album"],
  },
  {
    id: "pc1",
    type: "photocard",
    name: "Hyunjin",
    subtitle: "5-STAR (Digipack)",
    image: "https://placehold.co/300x450/eee/333?text=Hyunjin+PC",
    tags: ["Selfie", "Raro"],
  },
  {
    id: "pc2",
    type: "photocard",
    name: "Kazuha",
    subtitle: "EASY (Weverse)",
    image: "https://placehold.co/300x450/eee/333?text=Kazuha+PC",
    tags: ["POB", "Limited"],
  },
];
