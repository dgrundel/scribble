<script lang="ts">
    import SwipeContainer from "./SwipeContainer.svelte";

    let left;
    let right;

    let offset = '0';

    const setOffset = (n: number) => {
        offset = Math.ceil(n) + 'px';
    };

    /**
     * reveal right side on left swipe
     */
    const onLeftSwipe = () => {
        setOffset(right ? -1 * right.scrollWidth : 0);
    };

    /**
     * reveal left side on right swipe
     */
    const onRightSwipe = () => {
        setOffset(left ? left.scrollWidth : 0);
    };
</script>

<SwipeContainer {onLeftSwipe} {onRightSwipe}>
    <div class="wrap">
        <div class="item" style={`left: ${offset}`}>
            <slot/>
    
            {#if $$slots.left}
                <div class="left" bind:this={left}>
                    <slot name="left"/>
                </div>
            {/if}
            
            {#if $$slots.right}
                <div class="right" bind:this={right}>
                    <slot name="right"/>
                </div>
            {/if}
        </div>
    </div>
</SwipeContainer>

<style>
    .wrap {
        overflow: hidden;
    }

    .item {
        display: block;
        position: relative;
        transition: left 150ms ease;
    }

    .left, .right {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
    }

    .left {
        right: 100%;
    }

    .right {
        left: 100%;
    }
</style>