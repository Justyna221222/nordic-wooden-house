<template>
    <div class="container1">
            <div>
            </div>
            <div>
                <the-header></the-header>
            </div>
            <div>
            <router-view></router-view>
            </div>

    </div>
</template>

<script>
    import TheHeader from './components/TheHeader.vue';
    export default {
        components: {
            TheHeader,
        },
        data() {
            return {

            };
        }
    };
</script>

<style>
* {
    margin: 0;
    padding: 0;
    color: #2a2e28;
    box-sizing: border-box;
    font-family: "Gill Sans", sans-serif;
}
.container1 {
    display: flex;
    justify-content: center;
}
p {
    color: #2a2e28;
}

button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  font-size: 18px;
  background-color: #CFAC58;
  color: #222222;
  border: none;
  cursor: pointer;
  margin: 20px 0;
}

button:hover,
button:active {
  background-color: #ebc774;

}

.header {
    font-size: 25px;
    text-align: center;
    background-color: #f3e0d1;
    margin: 0;
}

.route-enter-from {}
.route-enter-active {

}
.route-enter-to {}

.route-leave-active {
    animation: slide-scale 0.4s ease-in;
}


@media only screen and (min-width: 0px) and (max-width: 1200px) {
    body {
        width:100%;
    }
    .container1 {
        margin:0;
        padding:0;
        display: block;
        width: 100%;
    }

}

@keyframes slide-scale {
    0% {
        transform: translateX(0) scale(1);
    }
    70% {
        transform: translateX(-120px) scale(1.1);
    }
    100% {
        transform: translateX(-150px) scale(1);
    }

}


</style>