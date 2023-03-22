<template>
  <div>
    <header>
      <nav
        class="h-20 bg-neutral-700 flex text-emerald-600 justify-between items-center py-4 px-6"
      >
        <NuxtLink to="/" class="text-2xl font-bold">/ 24</NuxtLink>
        <div class="text-3xl text-gray-200 flex gap-4">
          <LayoutsNavItem href="/settings">
            <Icon name="ic:baseline-settings" />
          </LayoutsNavItem>
          <LayoutsNavItem href="https://twitter.com/umarghanis">
            <Icon name="fe:twitter" />
          </LayoutsNavItem>
          <LayoutsNavItem href="https://github.com/syafiqabdillah" external>
            <Icon name="fe:github" />
          </LayoutsNavItem>
        </div>
      </nav>
    </header>

    <div>
      <slot />
    </div>
  </div>
</template>
