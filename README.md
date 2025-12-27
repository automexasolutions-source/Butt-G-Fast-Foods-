# Butt G Fast Foods - Full-Stack Restaurant Website

A mind-blowing, fully animated Next.js 16 restaurant website with complete e-commerce functionality, table booking, and advanced features.

## Features

- **Stunning Hero Section**: Auto-playing video background with parallax scrolling effects
- **Complete Menu System**: 100+ items with advanced search, filtering, and sorting
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Checkout System**: Complete checkout flow with EasyPaisa payment integration
- **Payment Upload**: Customers upload payment screenshot for order verification
- **Email Notifications**: Automated order confirmation emails using Nodemailer
- **Table Booking**: Advanced reservation system with time slot selection
- **Hot Deals**: Special combo offers with animated cards
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations throughout
- **Menu Detail Pages**: Individual pages for each item with size selection

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **Email**: Nodemailer
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Email service credentials (Gmail recommended)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd butt-g-fast-foods
```

2. Install dependencies:
```bash
npm install
```

3. Create a \`.env.local\` file in the root directory:
```env
# SMTP Configuration for Email Notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# Restaurant email (receives order notifications)
RESTAURANT_EMAIL=restaurant@example.com
```

### Email Setup (Gmail)

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
   - Use this as \`SMTP_PASS\` in your .env.local

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── about/              # About page
│   ├── api/
│   │   └── orders/         # Order submission API
│   ├── booking/            # Table booking page
│   ├── cart/               # Shopping cart page
│   ├── checkout/           # Checkout page
│   ├── contact/            # Contact page
│   ├── deals/              # Hot deals page
│   ├── menu/
│   │   ├── [id]/          # Menu item detail pages
│   │   └── page.tsx       # Menu listing page
│   ├── order-confirmation/ # Order success page
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── hero.tsx           # Hero section with video
│   ├── navbar.tsx         # Navigation with cart
│   ├── footer.tsx         # Footer
│   └── menu-card.tsx      # Menu item card
├── contexts/
│   └── cart-context.tsx   # Cart state management
├── lib/
│   └── menu-data.ts       # Menu items data
└── public/                # Static assets
```

## Key Features Explained

### 1. Cart System
- Add/remove items with size selection
- Quantity adjustment
- LocalStorage persistence
- Real-time total calculation

### 2. Checkout Flow
1. Customer fills delivery information
2. Sees EasyPaisa payment details (0321 4500552)
3. Makes payment via EasyPaisa
4. Uploads payment screenshot
5. Submits order

### 3. Email Notifications
- **Customer Email**: Order confirmation with details
- **Restaurant Email**: New order alert with payment screenshot attached

### 4. Menu System
- Search across all items
- Filter by category
- Sort by price/name
- Price range filtering
- 100+ items from the restaurant menu

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`SMTP_HOST\` | SMTP server host | Yes |
| \`SMTP_PORT\` | SMTP server port | Yes |
| \`SMTP_USER\` | SMTP username/email | Yes |
| \`SMTP_PASS\` | SMTP password/app password | Yes |
| \`SMTP_FROM\` | Sender email address | Yes |
| \`RESTAURANT_EMAIL\` | Email to receive orders | Yes |

## Customization

### Update Menu Items
Edit \`lib/menu-data.ts\` to add/modify menu items.

### Change Brand Colors
Update Tailwind classes:
- Primary: \`#fbbf24\` (yellow)
- Secondary: \`#dc2626\` (red)
- Background: \`#000000\` (black)

### Modify EasyPaisa Number
Update the number in \`app/checkout/page.tsx\` (line with EasyPaisa details).

## Contact Information

- **Address**: 18 19-B Commercial, Sher Shah Colony, Raiwand Road, Lahore
- **Phone**: 0321 4500552
- **Hours**: 2:30 PM - 4:00 AM (Daily)

## License

This project is created for Butt G Fast Foods.

## Support

For issues or questions, contact the development team.
```

---

**Built with ❤️ for Butt G Fast Foods**
