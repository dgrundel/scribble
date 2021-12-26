<script lang="ts">
    let timeout;
    let target;
    let flyout;

    const updatePosition = () => {
        const { scrollHeight: height, offsetWidth: width } = target;
        const { offsetWidth: flyoutWidth } = flyout;
        const { top, left } = target.getBoundingClientRect();
        const { scrollX, scrollY } = window;

        flyout.style.top = (top + height + scrollY) + 'px';
        flyout.style.left = (left + (width / 2) + scrollX - (flyoutWidth / 2)) + 'px';
    };

    const show = () => {
        flyout.style.display = 'block';
    };

    const hide = () => {
        flyout.style.display = 'none';
    };

    const click = () => {
        // toggle display
        flyout.style.display === 'none' ? show() : hide();
    };

    const mouseenter = () => {
        if (timeout) {
            clearTimeout(timeout);
        }

        show();
        updatePosition();
    };
    const mouseleave = () => {
        timeout = setTimeout(hide, 1000);
    };
</script>

<span class="flyout-target" bind:this={target} on:mouseenter={mouseenter} on:mouseleave={mouseleave} on:click={click}>
    <slot name="target"></slot>
</span>

<div class="flyout" bind:this={flyout} on:mouseenter={mouseenter} on:mouseleave={mouseleave}>
    <div class="flyout-content">
        <slot name="content"></slot>
    </div>
</div>

<style>
    .flyout-target {
        display: inline-block;
    }
    .flyout {
        --flyout-color: #000;

        display: none;
        z-index: 999;
        position: absolute;
        left: 0;
        top: 0;
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
    }

    .flyout-content {
        padding: .25rem .5rem;
        border-radius: 0.3rem;
        background-color: var(--flyout-color);
    }
</style>