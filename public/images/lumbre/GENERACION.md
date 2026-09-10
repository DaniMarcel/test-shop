# Imágenes de prueba de Lumbre

Generadas con la herramienta integrada ImageGen. Son representaciones conceptuales, no fotografías de productos disponibles para comprar.

Archivos finales en `public/images/lumbre/`:
- `hero-off.png`: ambiente de portada, lámpara apagada.
- `hero-on.png`: edición del mismo ambiente, lámpara encendida.
- `catalog-off.png`: cuatro productos apagados en una hoja de contacto.
- `catalog-on.png`: edición de la misma hoja con las cuatro lámparas encendidas.

La web muestra las dos versiones superpuestas con una transición de opacidad. La hoja de catálogo tiene dos columnas y una división horizontal en y=598 de 1254 píxeles, contemplada en LampPhoto. Para productos reales, conviene usar dos fotos independientes por producto con el mismo encuadre, tamaño y posición.

## Prompts utilizados

### Portada apagada
Create a photorealistic high-end interior design editorial photograph, landscape 3:2. Quiet Mediterranean living room, warm ivory limewash wall, sculptural rust orange mushroom table lamp on a low dark walnut sideboard on the RIGHT half, curved cream boucle lounge chair to the far left, a small stack of books, olive branch shadow, beige travertine floor. Large empty textured wall in upper left, afternoon soft natural light from left. The lamp is SWITCHED OFF, opaque burnt orange metal dome and cylindrical stem, design collectible. Sophisticated architecture magazine photography, subtle film grain, restrained palette, no text, no graphics, no watermark. Composition focus on orange lamp with enough room around it. Save the output image and return local file path.

### Catálogo apagado
Create a precise 2 by 2 contact sheet of FOUR separate photorealistic studio product photographs of designer lamps, equal quadrants, no gutters, no text, no labels. Each quadrant has identical pale warm ivory seamless studio background and the product centered fully visible with ample 15 percent margin. Top left: sculptural burnt-orange metal mushroom table lamp with wide hemispherical dome and stout cylindrical stem. Top right: Japanese cream paper globe pendant hanging by thin dark cable, spherical ribbed paper shade. Bottom left: elegant tall dark walnut floor lamp with cream conical linen shade and round foot, entire floor lamp visible. Bottom right: sculptural ivory travertine wall sconce with a vertical rounded capsule body mounted on pale wall. ALL FOUR LAMPS SWITCHED OFF, no emitted light. Beautiful soft studio daylight, gentle shadows, premium ecommerce photography, physically plausible materials. Square overall image. Save image and return local file path.

### Edición de portada encendida
Edit this exact interior photograph. Preserve every object, lamp geometry, camera, framing and position exactly. Change only lighting: evening atmosphere with less daylight, switch the orange mushroom lamp ON with a beautiful warm 2700K light shining downward from under its opaque dome, illuminating its stem and walnut cabinet with golden pools of light, gentle glow on wall. Opaque metal dome stays orange, not translucent. Keep interior legible, cozy sophisticated mood not pitch black. No new objects or text. Same aspect ratio and dimensions.

### Edición de catálogo encendido
Edit this exact 2x2 lamp product contact sheet, preserving identical quadrant boundaries, product placement, geometry, sizes, camera angle and materials. ONLY change the lighting to SWITCH ALL FOUR LAMPS ON with warm 2700K light and subtly dimmer warm neutral studio backgrounds. Top left opaque orange mushroom dome casts bright warm light downward around stem, not through its metal. Top right paper sphere glows warm cream from within. Bottom left linen floor lamp shade glows warmly from within and casts light below. Bottom right stone wall sconce emits warm light upward and downward onto the wall, stone stays opaque. Same exact layout so these images can crossfade without objects moving. No new objects no text. Same dimensions.
