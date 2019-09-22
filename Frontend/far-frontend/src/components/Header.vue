<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-brand">FAR</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link to="/" active-class="active" exact tag="li" class="nav-item">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link to="/about" active-class="active" exact tag="li" class="nav-item">
            <a class="nav-link">About</a>
          </router-link>
        </ul>
      </div>
    </nav>
  </header>
</template>
