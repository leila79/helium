<template>
    <div v-if="title" class="writer-title">
        <b>{{ title }}</b>
    </div>
    <div class="separator">
        <div v-if="title" class="inline" :style="{ width: width + '%' }"></div>
    </div>
</template>

<script>
export default {
    name: 'seperator_component',
    props: {
        title: {
            require: false,
            type: String
        },
        width: {
            require: false,
            type: Number
        }
    }

}
</script>

<style>
.separator {
    position: relative;
    margin-top: 2vh;
    width: 100%;
    height: 2px;
    background-color: rgba(19, 158, 202, 0.3);
}

.writer-title {
    margin-top: 4vh;
    font-size: 1.25vw;
}

.inline {
    background-color: var(--water-blue);
    height: 2px;
}
</style>