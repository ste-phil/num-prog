<template>
  <div>
    <h1>Newton Interpolation</h1>
    <label>Evaluate at: </label>
    <input v-model.number="evalPointX"/>

    <br><br>

    <table>
      <tr>
        <th>i / k</th>
        <th v-for="k in nPoints" :key="k">
          {{k}}
        </th>
      </tr>
      <tr v-for="i in nPoints" :key="i">
        <td>{{i}}</td>
        <template v-for="k in nPoints">
          <td v-if="k == 1" :key="k">
            <input v-model.number="points[i-1].x" placeholder="x" class="input-coord"/>
            <input v-model.number="points[i-1].y" placeholder="y" class="input-coord"/>
          </td>
          <td v-if="k != 1" :key="k">
            <vue-mathjax :formula="'$$' + solver.getResultString(i-1, k-1) + ' = ' + solver.getResult(i-1, k-1) + '$$'"></vue-mathjax>
          </td>
        </template>
      </tr>
    </table>

    <br>
    <button @click="addPoint()">+</button>

    <br>
    <br>
    <p>General Polynomial</p>
    <vue-mathjax :formula="'$$' + solver.getGeneralPolynomial() + '$$'"></vue-mathjax>

    <p :data="p = solver.getPolynomial(evalPointX)" >Polynomial at x = {{evalPointX}}</p>
    <vue-mathjax :formula="'$$' + p[0] + ' = ' + p[1] + '$$'"></vue-mathjax>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import NewtonSolver from '@/logic/linear-interpolation/NewtonSolver.ts';
import Point from '@/logic/linear-interpolation/entities/Point.ts';
import VueMathjax from '@/components/vue-mathjax.vue';

@Component({
  components: {
    VueMathjax
  },
})
export default class Newton extends Vue {
  private solver: NewtonSolver;
  private evalPointX = 5.0;
  private points: Point[] = new Array<Point>(new Point(6, 2), new Point(4, 2), new Point(2, 3));
  
  constructor() {
    super();
    this.solver = new NewtonSolver(this.points, this.evalPointX);
  }

  public get nPoints() {
    return this.points.length;
  }

  public addPoint() {
    this.points.push(new Point(0, 0));
  }

  @Watch('points', { deep: true })
  onPointsChanged(value: Point[], oldValue: Point[]) {
    this.solver.solve(this.evalPointX);
  }

  @Watch('evalPointX')
  onEvalPointXChanged(value: number, oldValue: number) {
    this.solver.solve(this.evalPointX);
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
  text-align: center;
}

tr:nth-child(even) {
  background-color: var(--color-bg-alt);
}

th {
  background-color: var(--color-primary);
  text-align: center;
}

tr > td:first-child {
  background-color: var(--color-primary);
  width: 30px;
  text-align: center;
}

.input-coord {
  width: 50px; 
  text-align: center ;
}

</style>