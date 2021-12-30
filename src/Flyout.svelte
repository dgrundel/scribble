<script lang="ts">
    import { afterUpdate } from "svelte";

    export let onShow: (() => void) | undefined = undefined;
    export let onHide: (() => void) | undefined = undefined;
    let timeout;
    let target;
    let flyout;
    let content;
    let visible = false;

    const updatePosition = () => {
        const { scrollHeight: height, offsetWidth: width } = target;
        const { offsetWidth: flyoutWidth } = flyout;
        const { top, left } = target.getBoundingClientRect();
        const { scrollX, scrollY } = window;

        const flyoutLeft = left + (width / 2) + scrollX - (flyoutWidth / 2);
        //offset the little triangle
        const contentLeft = flyoutLeft < 0 ? Math.abs(flyoutLeft) : 0;

        flyout.style.top = (top + height + scrollY) + 'px';
        flyout.style.left = flyoutLeft + 'px';
        content.style.left = contentLeft + 'px';
    };

    const show = () => {
        visible = true;
        // updatePosition();
        onShow && onShow();
    };

    const hide = () => {
        visible = false;
        onHide && onHide();
    };

    const toggle = () => {
        // toggle display
        visible ? hide() : show();
    };

    const mouseenter = () => {
        if (timeout) {
            clearTimeout(timeout);
        }

        show();
    };

    const mouseleave = () => {
        timeout = setTimeout(hide, 1000);
    };

    afterUpdate(() => updatePosition());
</script>

<span class="flyout-target" bind:this={target} on:mouseenter={mouseenter} on:mouseleave={mouseleave} on:click={toggle}>
    <slot name="target"></slot>
</span>

<div class={`flyout ${visible ? 'visible' : ''}`} bind:this={flyout} on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
    <div class="flyout-content" bind:this={content}>
        <slot name="content"></slot>
    </div>
</div>

<style>
    .flyout-target {
        display: inline-block;
    }
    .flyout {
        --flyout-color: #111;

        display: none;
        z-index: 999;
        position: absolute;
        left: 0;
        top: 0;
        max-width: 100vw;
    }

    .flyout.visible {
        display: block;
    }

    .flyout::before {
        --size: .4rem;

        content: ' ';
        display: block;
        margin: calc(-1 * var(--size)) auto 0;
        width: 0; 
        height: 0; 
        border-left: var(--size) solid transparent;
        border-right: var(--size) solid transparent;
        border-bottom: var(--size) solid var(--flyout-color);
        position: relative;
        z-index: 99;
    }

    .flyout-content {
        position: relative;
        top: 0;
        left: 0;
        padding: .5rem .75rem;
        margin: 0 .75rem;
        border-radius: 0.3rem;
        background-color: var(--flyout-color);
        line-height: var(--line-height);
        box-shadow: 0 0 1.5rem rgba(179, 179, 179, 0.1);
    }
</style>