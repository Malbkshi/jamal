# Font Configuration for Manal Al Jamal Website

This document explains how the fonts are set up in the Manal Al Jamal Beauty Center website for optimal performance and SEO.

## Font Setup

We use Next.js Font Optimization to improve performance metrics like Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS), which are important for SEO and user experience.

### Local Fonts

The website uses the following custom Arabic fonts stored locally:

1. **IBM Plex Sans Arabic**
   - Multiple weights: Light (300), Regular (400), Medium (500), SemiBold (600), and Bold (700)
   - Used for headings and emphasized text
   - Variable: `--font-ibm-plex`
   - CSS class: `font-ibm`

### Google Fonts

2. **Almarai**
   - Regular (400) and Bold (700) weights
   - Used as the base body font and for elegant text
   - Variable: `--font-almarai`
   - CSS class: `font-almarai` and `elegant-text`

## How to Use

### In CSS

```css
/* Using CSS variables */
.my-heading {
  font-family: var(--font-ibm-plex), var(--font-almarai), sans-serif;
}

.elegant-text {
  font-family: var(--font-ibm-plex), sans-serif;
  font-weight: 300;
}
```

### Using Tailwind Classes

```jsx
<h1 className="font-ibm">عنوان رئيسي</h1>
<p className="elegant-text">نص أنيق</p>
<div className="font-almarai">نص عادي</div>
```

## SEO Benefits

- **Performance**: Fonts are preloaded and optimized, improving page load times
- **No Layout Shift**: Font swapping is handled to prevent layout shifts
- **Self-hosting**: Font files are served from our domain, reducing external requests
- **Font Display Swap**: Text remains visible during font loading
- **Subset Optimization**: Only the Arabic character subset is loaded when using Google Fonts

## Adding New Fonts

1. Add the font files to `/public/Fonts/`
2. Update the font configuration in `/src/fonts/index.ts`
3. Add the new font variables to the className in `layout.tsx`
4. Add the new font to Tailwind config if needed

## Font Resources

- [Next.js Font Optimization](https://nextjs.org/docs/basic-features/font-optimization)
- [Google Fonts](https://fonts.google.com/)
- [IBM Plex Sans Arabic](https://github.com/IBM/plex/tree/master/IBM-Plex-Sans-Arabic)
- [Arabic Typography Resources](https://arabictype.com/) 