<script lang="ts">
    type Handler = (() => void) | undefined;
    
    export let onLeftSwipe: Handler = () => {}; 
    export let onRightSwipe: Handler = () => {}; 
    export let swipeThreshold = 150;
    export let hoverThreshold = 24;

    let elem, startX, endX;

    const touchstart = (e: TouchEvent) => {
        startX = e.changedTouches[0].screenX;
    };
    const touchend = (e: TouchEvent) => {
        endX = e.changedTouches[0].screenX;
        const distance = Math.abs(endX - startX);

        if (distance > swipeThreshold) {
            endX < startX ? onLeftSwipe() : onRightSwipe();
        }
    };
    const mousemove = (e: MouseEvent) => {
        const { left, right } = elem.getBoundingClientRect();
        const isLeftHover = Math.abs(e.screenX - left) < hoverThreshold;
        const isRightHover = Math.abs(e.screenX - right) < hoverThreshold;
        if (isLeftHover) {
            onRightSwipe();
        } else if (isRightHover) {
            onLeftSwipe();
        }
    };
</script>

<div bind:this={elem} on:touchstart={touchstart} on:touchend={touchend} on:mousemove={mousemove}>
    <slot/>
</div>
