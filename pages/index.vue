<template>
  <main id="game">
    <div class="w-full max-w-lg flex flex-col items-center">
      <h1 class="text-6xl font-bold text-emerald-600 flex gap-3 text-right">
        <span v-for="c in numDecon">{{ c.value }}</span>
      </h1>
      <Transition>
        <Card v-if="expDisplay" class="mt-10"
          ><span class="text-3xl text-neutral-900 tracking-[15px] font-bold">
            {{ expDisplay }} {{ isExpValid ? ` = ${result}` : "" }}
          </span></Card
        >
      </Transition>
      <!-- Timer -->
      <Transition>
        <div
          v-if="!isFinished"
          class="w-full h-8 bg-neutral-700 mt-10 rounded-lg overflow-hidden"
        >
          <Transition>
            <div
              class="h-full bg-emerald-600 transition-all"
              :style="{
                width: percentageTimer(),
              }"
              v-if="!isTimeout"
            ></div>
          </Transition>
          <Transition>
            <div
              v-if="isTimeout"
              class="h-full flex justify-center items-center text-emerald-400"
            >
              Time's up!
            </div>
          </Transition>
        </div>
      </Transition>
      <!-- Results -->
      <Transition>
        <Card
          v-if="isFinished"
          class="mt-10 text-neutral-900 flex flex-col gap-2"
        >
          <div class="result-item">
            <span>Number</span>
            <span>{{ sessionInfo?.num }}</span>
          </div>
          <div class="result-item">
            <span>Your guess</span>
            <span>{{ sessionInfo?.guess }}</span>
          </div>
          <div class="result-item">
            <span>Distance to 24</span>
            <span>{{ sessionInfo?.distance }}</span>
          </div>
          <div class="result-item">
            <span>Time remaining</span>
            <span>{{ sessionInfo?.remainingTime }}s</span>
          </div>
        </Card>
      </Transition>
      <!-- Board -->
      <div class="mt-10 w-full max-w-2xl flex gap-5">
        <div class="flex-[2] grid grid-cols-2 gap-2 content-start">
          <Box
            :primary="true"
            :onClick="() => addNumber(num)"
            :disabled="isUsed(num)"
            v-for="num in numDecon"
          >
            {{ num.value }}
          </Box>
        </div>
        <div class="flex-[3] grid grid-cols-3 content-start gap-2">
          <Box :onClick="() => applyOperator(op)" v-for="op in OPERATORS">
            {{ op.label }}
          </Box>
          <Transition>
            <Box :onClick="del" v-if="exp.length > 0">
              <Icon name="ri:delete-back-2-fill" />
            </Box>
          </Transition>
          <Transition>
            <Box :onClick="clearAll" v-if="exp.length > 0"
              ><span class="text-2xl font-semibold">CA</span></Box
            >
          </Transition>
        </div>
      </div>
      <Transition>
        <Button
          :onClick="submit"
          v-if="isExpValid && used.length === 4 && !isTimeout && !isFinished"
          :disabled="isTimeout"
          primary
        >
          submit
        </Button>
      </Transition>
      <Transition>
        <Button :onClick="playAgain" v-if="isTimeout || isFinished">
          play again
        </Button>
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { OPERATORS, TIME_TO_COMPLETE } from "~/constants";
import { Num, Operator, SessionInfo } from "~/types";

useHead({
  title: "24",
  meta: [
    {
      name: "description",
      content: "Get it as close as possible to 24",
    },
  ],
});

const num = ref(8888);
const used = ref<Num[]>([]);
const isFinished = ref(false);
const sessionInfo = ref<SessionInfo>();
const isTimeout = ref(false);
const remainingTime = ref(TIME_TO_COMPLETE);
const intervalTimeout = ref<NodeJS.Timer>();
const expDisplay = ref("");
const exp = ref("");

onMounted(() => {
  document.getElementById("game")?.scrollIntoView({ behavior: "smooth" });
  setNum();
  intervalTimeout.value = setInterval(() => {
    adjustRemainingTime();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalTimeout.value);
});

function adjustRemainingTime() {
  if (remainingTime.value > 0) {
    remainingTime.value -= 1;
  } else {
    isTimeout.value = true;
  }
}

// initial number
function setNum(): void {
  const min = 1000;
  const max = 9999;
  num.value = Math.floor(Math.random() * (max - min + 1)) + min;
}

//
function isUsed(n: Num): boolean {
  return (
    used.value.filter(
      (item) => item.location === n.location && item.value === n.value
    ).length > 0
  );
}

function addNumber(n: Num): void {
  // forbidden if before is num
  if (
    exp.value.length > 0 &&
    num.value.toString().includes(exp.value[exp.value.length - 1])
  ) {
    // do nothing
  } else {
    expDisplay.value += n.value;
    exp.value += n.value;
    used.value.push(n);
  }
}

function applyOperator(op: Operator): void {
  expDisplay.value += op.label;
  exp.value += op.value;
}

function del(): void {
  if (exp.value.length > 0) {
    // remove last used Num
    if (used.value.length > 0) {
      used.value = used.value.slice(0, used.value.length - 1);
    }
    exp.value = exp.value.slice(0, exp.value.length - 1);
    expDisplay.value = expDisplay.value.slice(0, expDisplay.value.length - 1);
  }
}

function clearAll(): void {
  exp.value = "";
  expDisplay.value = "";
  used.value = [];
}

// for the timer
function percentageTimer() {
  return `${parseInt(
    (
      ((TIME_TO_COMPLETE - remainingTime.value) / TIME_TO_COMPLETE) *
      100
    ).toString(),
    10
  )}%`;
}

function submit() {
  sessionInfo.value = {
    num: num.value,
    guess: expDisplay.value,
    distance: Math.abs(24 - parseInt(result.value)),
    remainingTime: remainingTime.value,
  };
  isFinished.value = true;
}

function playAgain() {
  location.reload();
}

// so we can track which number is clicked, if there are identical numbers
const numDecon = computed<Num[]>(() => {
  return num.value
    .toString()
    .split("")
    .map((c, index) => {
      return {
        location: index,
        value: Number(c),
      };
    });
});

const result = computed<string>(() => {
  try {
    return Number(eval(exp.value)).toFixed(1).toString();
  } catch (err) {
    return "0";
  }
});

const isExpValid = computed<boolean>(() => {
  if (result.value !== "0") return true;
  return false;
});
</script>
