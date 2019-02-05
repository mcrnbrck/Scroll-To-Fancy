# Scroll To Fancy
No dependency, super simple background image parallax and scroll to reveal effects for your website.

**Demo**
[martinc.de/scroll-to-fancy](http://martinc.de/scroll-to-fancy/)


## Easy to Install

Just add `scroll-to-fancy.min.css` and `scroll-to-fancy.min.js` to your website, then call `ScrollToFancy().`

```html
<link rel="stylesheet" href="/css/scroll-to-fancy.min.css">    

<script src="/js/jquery.scroll-to-fancy.min.js"></script>
<script>
  ScrollToFancy({
    // optional settings
    parallax:               true,
    parallaxMinWidth:       800,
    scrollToReveal:         true,
    scrollToRevealMinWidth: 800,
    scrollToRevealOffset:   140
  });
</script>
```

Scroll To Fancy is written in JavaScript, has no dependencies and works in Firefox, Chrome, Safari, Edge and IE 11.

## Parallax effect for background images

Add a parallax effect to any html element with a background image. Add `data-parallax-bg="0.5"` as an attribute to get started.

```html
<div class="background" data-parallax-bg="0.5"></div>
```

You can use `data-parallax="0.5"` to animate an the vertical position of an element. When the element enters the viewport, it is animated by applying a translate(x, y) css transform. 

```html
<div class="element" data-parallax="0.5"></div>
```

**Modify the scroll speed of your parallax element**

- 0.9 = almost same speed as user scrolls (fast)
- 0.5 = half of the scroll speed
- 0.1 = almost fixed (slow)

## Scroll to reveal effect for any element

```html
<div class="example" data-reveal="fadeInUp"></div>
```

**Choose the fade in animation**

Enter the name of the CSS Keyframe animation as the value of data-reveal.
You can use the following animations or create your own:

- fadeIn
- fadeInLeft
- fadeInRight
- fadeInUp
- fadeInUpBig
- fadeInDown
- fadeInDownBig
- zoomIn

**Control the delay** (optional)

Choose the delay in milliseconds when the element fades in. This comes in handy when multiple elements enter the viewport at the same time.

```html
<div class="box-1" data-reveal="fadeInUp" data-reveal-delay="400"></div>
<div class="box-2" data-reveal="fadeInUp" data-reveal-delay="800"></div>
<div class="box-3" data-reveal="fadeInUp" data-reveal-delay="1200"></div>
```

## Demo

[View Demo](http://martinc.de/scroll-to-fancy/)
