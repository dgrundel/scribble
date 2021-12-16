<script lang="ts">
    let target;
    let flyout;

    const updatePosition = () => {
        const { scrollHeight: height, offsetWidth: width } = target;
        const { offsetWidth: flyoutWidth } = flyout;
        const { top, left } = target.getBoundingClientRect();
        const { scrollX, scrollY } = window;

        console.log({
            target, top, left, height, width, flyoutWidth, scrollY, scrollX
        })

        flyout.style.top = (top + height + scrollY) + 'px';
        flyout.style.left = (left + (width / 2) + scrollX - (flyoutWidth / 2)) + 'px';
    };
</script>

<div class="flyout-target" bind:this={target} on:mouseenter={updatePosition}>
    <slot name="target"></slot>

    <div class="flyout" bind:this={flyout}>
        <div class="flyout-content">
            <slot name="content"></slot>
        </div>
    </div>
</div>

<style>
    .flyout-target {
        --flyout-color: #000;

        display: inline-block;
    }

    .flyout {
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

    .flyout-target:hover .flyout {
        display: block;
    }

    .flyout-content {
        padding: .25rem .5rem;
        border-radius: 0.3rem;
        background-color: var(--flyout-color);
        /* box-shadow: 0 0 5rem rgba(255,255,255, 0.2); */
    }
</style>