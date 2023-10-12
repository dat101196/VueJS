<template>
    <AppLink id="logo" to="/">
        <div class="logo__container">
            <span class="logo__first-text">R</span>
            <img class="logo__img" src="../assets/img/carey.jpg">
            <span>sie</span>
            <p class="logo__est">Est 2023</p>
            <img class="logo__img-border" src="../assets/img/pngegg.png" />
        </div>
    </AppLink>
</template>

<style scoped>
span {
    font-family: 'Imperial Script', cursive;
    font-size: 6.0rem;
    font-weight: 500;
    z-index: 2;
}

.logo__container {
    display: flex;
    align-items: center;
    height: var(--header-height);
    margin-bottom: 16px;
}

.logo__first-text {
    font-size: 8.0rem;
}

.logo__img {
    height: 50px;
    object-fit: contain;
    margin: 8px -1px 0 5px;
    z-index: 2;
}

.logo__img-border {
    height: var(--header-height);
    object-fit: contain;
    margin-left: -80px;
    opacity: 0.8;
    /* -webkit-transform: scaleX(-1);
    transform: scaleX(-1); */
}

.logo__est {
    align-self: flex-end;
    margin-left: -10px;
    font-size: 1.6rem;
    font-family: 'Dancing Script', cursive;
}
</style>