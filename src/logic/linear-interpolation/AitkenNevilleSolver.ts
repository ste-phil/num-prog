import Point from "./entities/Point";
import Result from "./entities/Result";

export default class AitkenNevilleSolver {

    //matrix with values k * i
    private evaluatedPoints: Result[][] = [[]];

    constructor(private points: Point[], evalPointX: number) {
        this.initAndReset();
        this.solve(evalPointX);
    }

    public initAndReset() {
        //Init for k = 0
        this.evaluatedPoints = [[]];
        for(let i = 0; i < this.points.length; i++) {
            this.evaluatedPoints[0][i] = new Result(this.points[i].y, this.points[i].y + "");
        }
    }

    public solve(evalPointX: number) {
        this.initAndReset();
        for(let k = 1; k < this.points.length; k++) {
            this.solveK(evalPointX, k);
        }
    }

    private solveK(evalPointX: number, k: number) {
        const iters = this.points.length - k;

        for (let i = 0; i < iters; i++) {
            const pik1 = this.evaluatedPoints[k-1][i].result;
            const pi1k1 = this.evaluatedPoints[k-1][i+1].result;
            const xik = this.points[i+k].x;
            const xi = this.points[i].x;
            
            const res = pik1 + ((evalPointX - xi) / (xik - xi)) * (pi1k1 - pik1);
            const resString = pik1 + " + \\frac{" + evalPointX  + " - " + xi + "}{" + xik + " - " + xi  + "} * (" + pi1k1 + " - " + pik1 + ")";

            if (k >= this.evaluatedPoints.length) this.evaluatedPoints.push(new Array<Result>(iters));
            this.evaluatedPoints[k][i] = new Result(res, resString);
        }
    }

    public get getISize() {
        return this.points.length;
    }

    public getResult(i: number, k: number) {
        if (k >= this.evaluatedPoints.length || i >= this.evaluatedPoints[k].length) return "";

        return this.evaluatedPoints[k][i].result;
    }

    public getResultString(i: number, k: number) {
        if (k >= this.evaluatedPoints.length || i >= this.evaluatedPoints[k].length) return "";
        
        return this.evaluatedPoints[k][i].resultString;
    }
}