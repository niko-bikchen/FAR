<template>
  <header>
    <nav class="navbar navbar-dark navbar-expand-md bg-success justify-content-between flow-r">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse collapse dual-nav w-50 order-1 order-md-0">
        <ul class="navbar-nav">
          <router-link to="/about" active-class="active" exact tag="li" class="nav-item">
            <a class="nav-link">About</a>
          </router-link>
        </ul>
      </div>
      <router-link
        to="/"
        class="navbar-brand mx-auto d-block text-center order-0 order-md-1 w-25"
      >FAR</router-link>
      <div class="navbar-collapse collapse dual-nav w-50 order-2"></div>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  position: sticky;

  nav {
    font-family: "Righteous";
    font-size: 24px;

    .navbar-brand {
      font-size: 36px;
      letter-spacing: 1px;
    }
  }
}

.flow-r {
  background: linear-gradient(
    90deg,
    rgb(15, 139, 255) 0%,
    rgba(0, 57, 108, 1) 100%
  );
  background-size: 400% 400%;

  animation: flow 10s ease infinite;
}

@keyframes flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>