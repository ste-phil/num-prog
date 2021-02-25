<template>
  <div>
    <h1>Aitken Neville Interpolation</h1>
    <label>Evaluate at: </label>
    <input v-model="evalPointX"/>

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
            <input v-model="points[i-1].x" placeholder="x" class="input-coord"/>
            <input v-model="points[i-1].y" placeholder="y" class="input-coord"/>
          </td>
          <td v-if="k != 1" :key="k">
            <vue-mathjax :formula="'$$' + solver.getResultString(i-1, k-1) + ' = ' + solver.getResult(i-1, k-1) + '$$'"></vue-mathjax>
          </td>
        </template>
      </tr>
    </table>

    <br>
    <button @click="addPoint()">+</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AitkenNevilleSolver from '@/logic/linear-interpolation/AitkenNevilleSolver.ts';
import Point from '@/logic/linear-interpolation/entities/Point.ts';
import VueMathjax from '@/components/vue-mathjax.vue';

@Component({
  components: {
    VueMathjax
  },
})
export default class AitkenNeville extends Vue {
  private solver: AitkenNevilleSolver;
  private evalPointX = 4.0;
  private points: Point[] = new Array<Point>(new Point(3, 2), new Point(5, 4));
  
  constructor() {
    super();
    this.solver = new AitkenNevilleSolver(this.points, this.evalPointX);
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
  width: 30px; 
  text-align: center ;
}

</style>