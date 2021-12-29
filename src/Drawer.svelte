<script lang="ts">
    import ListItem from "./ListItem.svelte";
    import Home from "tabler-icons-svelte/icons/Home.svelte";
    import Files from "tabler-icons-svelte/icons/Files.svelte";
    import FileText from "tabler-icons-svelte/icons/FileText.svelte";
    import Plus from "tabler-icons-svelte/icons/Plus.svelte";
    import Star from "tabler-icons-svelte/icons/Star.svelte";
    import Settings from "tabler-icons-svelte/icons/Settings.svelte";
    import Tag from "tabler-icons-svelte/icons/Tag.svelte";
    import X from "tabler-icons-svelte/icons/X.svelte";
    import { goToPage } from "./router";
    import { createNote } from "./Note";

    export let isOpen: boolean = false;
    export let close: () => void;

    let all = [];
    let starred = [];
    let tags = [
        { name: 'foo', count: 5, },
        { name: 'bar', count: 27, },
        { name: 'baz', count: 3, },
        { name: 'qux', count: 2293, },
    ];

    let overlay;
    const overlayClick = e => {
        if (e.target === overlay) {
            close();
        }
    };

    const peterPan = `All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother. I suppose she must have looked rather delightful, for Mrs. Darling put her hand to her heart and cried, 'Oh, why can't you remain like this for ever!' This was all that passed between them on the subject, but henceforth Wendy knew that she must grow up. You always know after you are two. Two is the beginning of the end.

Of course they lived at 14, and until Wendy came her mother was the chief one. She was a lovely lady, with a romantic mind and such a sweet mocking mouth. Her romantic mind was like the tiny boxes, one within the other, that come from the puzzling East, however many you discover there is always one more; and her sweet mocking mouth had one kiss on it that Wendy could never get, though there it was, perfectly conspicuous in the right-hand corner.

The way Mr. Darling won her was this: the many gentlemen who had been boys when she was a girl discovered simultaneously that they loved her, and they all ran to her house to propose to her except Mr. Darling, who took a cab and nipped in first, and so he got her. He got all of her, except the innermost box and the kiss. He never knew about the box, and in time he gave up trying for the kiss. Wendy thought Napoleon could have got it, but I can picture him trying, and then going off in a passion, slamming the door.

Mr. Darling used to boast to Wendy that her mother not only loved him but respected him. He was one of those deep ones who know about stocks and shares. Of course no one really knows, but he quite seemed to know, and he often said stocks were up and shares were down in a way that would have made any woman respect him.

Mrs. Darling was married in white, and at first she kept the books perfectly, almost gleefully, as if it were a game, not so much as a brussels sprout was missing; but by and by whole cauliflowers dropped out, and instead of them there were pictures of babies without faces. She drew them when she should have been totting up. They were Mrs. Darling's guesses.`;
</script>

<div class="overlay {isOpen ? 'open' : ''}" bind:this={overlay} on:click={overlayClick}>
    <div class="drawer">
        <div class="close-button" on:click={close}><X/></div>
        
        <ListItem icon={Home} onClick={() => goToPage('home')}>
            Home
        </ListItem>
        
        <ListItem icon={Plus} onClick={() => goToPage('editor', { note: createNote() })}>
            New
        </ListItem>

        <ListItem
            icon={Files}
            badge={all.length ? all.length.toString() : ''}
            onClick={() => goToPage('noteList')}>
            All
        </ListItem>

        <ListItem
            icon={Star}
            badge={all.length ? all.length.toString() : ''}
            onClick={() => goToPage('noteList')}>
            Starred
        </ListItem>

        {#each tags as tag}
            <ListItem
                icon={Tag}
                badge={tag.count ? tag.count.toString() : ''}
                onClick={() => goToPage('noteList')}>
                {tag.name}
            </ListItem>
        {/each}

        <ListItem icon={FileText} onClick={() => goToPage('editor', { note: createNote({ body: peterPan }) })}>
            Peter and Wendy
        </ListItem>

        <ListItem icon={Settings} onClick={() => goToPage('settings')}>
            Settings
        </ListItem>
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
        --size: 2rem;
        --gap: .3rem;

        cursor: pointer;
        position: absolute;
        top: var(--gap);
        right: calc(-1 * (var(--size) + var(--gap)));
        width: var(--size);
        height: var(--size);
        line-height: var(--size);
        text-align: center;
        font-size: var(--size);
    }
</style>