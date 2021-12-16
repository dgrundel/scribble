<script lang="ts">
    export let open: boolean = false;
    export let close: () => void;

    let overlay;
    const overlayClick = e => {
        if (e.target === overlay) {
            close();
        }
    };
</script>

<div class="overlay {open ? 'open' : ''}" bind:this={overlay} on:click={overlayClick}>
    <div class="drawer">
        <div class="close-button" on:click={close}>&times;</div>
        I'm a drawer!
    </div>
</div>

<style>
    .overlay {
        --transition-duration: 175ms;

        position: fixed;
        top: 0;
        bottom: 0;
        left: -100vw;
        width: 100vw;
        z-index: 9999;
        transition-delay: var(--transition-duration);
        transition-duration: 0;
        transition-property: left;
    }

    .overlay.open {
        left: 0;
        transition-delay: unset;
    }

    .overlay::before {
        content: ' ';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        opacity: 0;
        transition-duration: var(--transition-duration);
        transition-property: opacity;
    }

    .overlay.open::before {
        opacity: 0.6;
    }

    .drawer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -85vw;
        width: 85vw;
        background-color: #282828;
        box-shadow: 0 0 2rem rgba(0,0,0,0.4);
        z-index: 1;
        transition-delay: 0;
        transition-duration: var(--transition-duration);
        transition-property: left;
        transition-timing-function: ease-in-out;
    }

    .open .drawer {
        left: 0;
    }

    .close-button {
        cursor: pointer;
        position: absolute;
        top: .3rem;
        right: .3rem;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        font-size: 2rem;
    }
</style>