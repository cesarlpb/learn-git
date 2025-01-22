app.component("provincia-display", {
  props: ["provincia"],
  template: `
        <div>
          <h2>{{ provincia.nombre }}</h2>
          <img :src="provincia.imagen.file" :alt="provincia.imagen.title" />
          <p>{{ provincia.descripcion }}</p>
          <p>{{ provincia.codigo }}</p>
        </div>
      `,
  computed: {},
});
