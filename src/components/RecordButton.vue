<template>
    <div class="border">
      <button class="inner"></button>
    </div>
</template>

<style>
.border {
  border: 10px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.inner {
  transition: all 0.2s ease;
  background-color: red;
  border-radius: 50%;
  cursor: pointer;
  height: 100%;
  width: 100%;
}

.inner:active{
  transform: scale(.7);
  border-radius: 12%;
}
</style>