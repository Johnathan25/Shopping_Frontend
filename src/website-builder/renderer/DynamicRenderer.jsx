import React from "react";
import { resolveSectionStyles } from "../../utils/styles";

// Global sections (navbar, footer, announcement)
import NavbarRenderer from "./sections/GlobalSections";

// Hero sections
import { HeroRenderer } from "./sections/HeroSections";

// Content sections (categories, services, testimonials, cta, etc.)
import {
  CategoriesRenderer,
  ProductsRenderer,
  ProductCardRenderer,
  ServicesRenderer,
  TestimonialsRenderer,
  CTARenderer,
  NewsletterRenderer,
  FAQRenderer,
  StatsRenderer,
  BrandsRenderer,
  TeamRenderer,
  PromotionalBannerRenderer,
  AboutHeroRenderer,
  StoryRenderer,
  ServicesHeroRenderer,
  ServicesGridRenderer,
  ContactRenderer,
    FeatureStripRenderer,
  CategoryTabsRenderer,
  MarqueeRenderer,
  ContactFormRenderer,
} from "./sections/ContentSections";

// Commerce sections (cart, checkout, orders, product details, search, filters)
import {
  SearchRenderer,
  FiltersRenderer,
  CartRenderer,
  CheckoutRenderer,
  MyOrdersRenderer,
  ProductDetailsRenderer,
  RelatedProductsRenderer,
  ReviewsRenderer,
} from "./sections/CommerceSections";

// ============================================================
// RENDERER REGISTRY
// ============================================================
const RENDERERS = {
    featureStrip: FeatureStripRenderer,
  categoryTabs: CategoryTabsRenderer,
  marquee: MarqueeRenderer,
  contactForm: ContactFormRenderer,
  // Global
  navbar: NavbarRenderer,
  announcementBar: NavbarRenderer, // same file handles announcement
  footer: NavbarRenderer,           // same file handles footer

  // Hero
  hero: HeroRenderer,

  // Commerce
  categories: CategoriesRenderer,
  products: ProductsRenderer,
  search: SearchRenderer,
  filters: FiltersRenderer,
  cart: CartRenderer,
  checkout: CheckoutRenderer,
  myOrders: MyOrdersRenderer,
  productDetails: ProductDetailsRenderer,
  relatedProducts: RelatedProductsRenderer,
  reviews: ReviewsRenderer,

  // Content
  services: ServicesRenderer,
  servicesHero: ServicesHeroRenderer,
  servicesGrid: ServicesGridRenderer,
  testimonials: TestimonialsRenderer,
  cta: CTARenderer,
  newsletter: NewsletterRenderer,
  faq: FAQRenderer,
  stats: StatsRenderer,
  brands: BrandsRenderer,
  team: TeamRenderer,
  promotionalBanner: PromotionalBannerRenderer,
  aboutHero: AboutHeroRenderer,
  story: StoryRenderer,
  contact: ContactRenderer,
};

// ============================================================
// DYNAMIC RENDERER
// ============================================================
export default function DynamicRenderer({
  pageConfig,
  themeConfig = {},
  currentDevice = "desktop",
  isBuilder = false,
  selectedSectionId = null,
  onSelectSection = () => {},
  products = [],
  categories = [],
  cartItems = [],
  orders = [],
  currentProduct = null,
}) {
  if (!pageConfig?.sections?.length) {
    return (
      <div className="p-16 text-center text-gray-400 text-sm">
        لا توجد سكاشن في هذه الصفحة
      </div>
    );
  }

  const sorted = [...pageConfig.sections]
    .filter((s) => s.visible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <div
      style={{
        fontFamily: themeConfig.fontFamily || "system-ui, sans-serif",
        backgroundColor: themeConfig.backgroundColor || "#ffffff",
        color: themeConfig.textPrimaryColor || "#0A2947",
        minHeight: "100vh",
      }}
    >
      {sorted.map((section) => {
        const Renderer = RENDERERS[section.type];
        if (!Renderer) {
          if (isBuilder) {
            return (
              <div
                key={section.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSection(section.id);
                }}
                className="p-6 text-center text-xs text-red-500 border-2 border-dashed border-red-300 bg-red-50"
              >
                سكشن غير معروف: <code>{section.type}</code>
              </div>
            );
          }
          return null;
        }

        const resolvedStyles = resolveSectionStyles(
          section.style,
          section.responsive,
          currentDevice,
          themeConfig
        );
        const isSelected = isBuilder && selectedSectionId === section.id;

        return (
          <div
            key={section.id}
            onClick={(e) => {
              if (isBuilder) {
                e.stopPropagation();
                onSelectSection(section.id);
              }
            }}
            className={
              isBuilder
                ? `relative cursor-pointer transition-all ${
                    isSelected
                      ? "ring-2 ring-blue-500 ring-offset-0 z-10"
                      : "hover:ring-2 hover:ring-blue-300"
                  }`
                : ""
            }
          >
            {isBuilder && (
              <span
                className={`absolute top-2 left-2 z-20 text-[10px] font-mono px-2 py-0.5 rounded pointer-events-none ${
                  isSelected ? "bg-blue-600 text-white" : "bg-black/60 text-white"
                }`}
              >
                {section.type} · {section.variant}
              </span>
            )}
            <Renderer
              section={section}
              content={section.content}
              style={section.style}
              layout={section.layout}
              resolvedStyles={resolvedStyles}
              theme={themeConfig}
              device={currentDevice}
              products={products}
              categories={categories}
              cartItems={cartItems}
              orders={orders}
              currentProduct={currentProduct}
              isBuilder={isBuilder}
            />
          </div>
        );
      })}
    </div>
  );
}

export { ProductCardRenderer };