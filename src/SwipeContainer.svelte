<script lang="ts">
    type Handler = ((distance: number) => void) | undefined;
    
    export let onLeft: Handler = undefined; 
    export let onRight: Handler = undefined; 
    export let threshold = 150;

    let startX, endX;

    const touchstart = (e: TouchEvent) => {
        startX = e.changedTouches[0].screenX;
    };
    const touchend = (e: TouchEvent) => {
        endX = e.changedTouches[0].screenX;
        const distance = Math.abs(endX - startX);

        if (distance > threshold) {
            endX < startX ? onLeft(distance) : onRight(distance);
        }
    };
</script>

<div on:touchstart={touchstart} on:touchend={touchend}>
    <slot/>
</div>
