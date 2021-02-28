export const LoadingData = {
  computed: {
    isLoadingData() {
      let isLoadingData = this.storeGetStatusProcessing();
      if (!isLoadingData && this.parentElement) {
        this.parentElement.addEventListener('scroll', this.eventScrollPagination);
        if (this.storeGetDataCount() != 0)
          setTimeout(() => this.eventScrollPagination(), 300);
      }
      return isLoadingData;
    },
  },
  data() {
    return {
      parentElement: null,
      parentElementEdge: 0,
      isScroll: false,
    }
  },
  watch: {
    typeHeight() {
      if (this.typeHeight == 'dense')
        setTimeout(() => this.eventScrollPagination(), 300);
    },
  },
  mounted() {
    this.parentElement = document.getElementById(this.id);
    this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;
  },
  updated() { this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;},
  methods: {
    eventScrollPagination() {
      this.isScroll = !this.isScroll;
      let bootAnchorEdge = document.querySelector(`#${this.id}-boot-anchor`).getBoundingClientRect().bottom - 300;
      if (bootAnchorEdge < this.parentElementEdge) {
        this.parentElement.removeEventListener('scroll', this.eventScrollPagination);
        console.log('next');
        if (this.storeGetDataNextApi()) 
          this.storeDispatchRequestData({next: true});
      }
    },
  },
}