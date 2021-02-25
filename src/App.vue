<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/AitkenNeville">Aitken-Neville</router-link>
      <router-link to="/Newton">Newton-Interpolation</router-link>
    </div>
    <router-view id="content"/>
  </div>
</template>

<style>
html, body {
  margin: 0; padding: 0; height:100%;
  font-family: 'ABeeZee', sans-serif;
  background: var(--color-bg);
  color: var(--color-fg);

  --color-bg: #212121;
  --color-bg-alt: #323232;
  --color-fg: rgba(255, 255, 255, 0.8);
  --color-primary: #52057b;


  --border-radius: 0px;
  --padding: 8px;
}

#app {
  height:100%;

  display: grid;
  grid-template-areas: 
    "nav content";
  grid-template-rows: 100% 1fr;
  grid-template-columns: 150px 1fr;
}

#content {
  grid-area: "content";

  padding: 8px 8px 8px 24px;
}

#nav{
  grid-area: "nav";

  border-right: 5px solid var(--color-fg);
}

#nav > a {
  width: 100%;
  display: block;
  font-size: 1.5rem;
  line-height: 2.2rem;

  text-decoration: none;
  text-align: center;
  padding: 8px 0 8px 0;

  color: inherit;
}

#nav > a:hover {
  background: rgba(255, 255, 255, 0.1);
}

input {
  background: var(--color-bg);
  border: 1px solid var(--color-fg);
  color: var(--color-fg);
  padding: 4px;
  
  border-radius: var(--border-radius);
}

button {
  background: var(--color-bg);
  border: 1px solid var(--color-fg);
  border-radius: var(--border-radius);

  color: var(--color-fg);
  padding: 4px;
  min-width: 30px;
}

button:hover {
  background: var(--color-bg-alt);
}

</style>
