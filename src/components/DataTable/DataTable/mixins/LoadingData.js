export const LoadingData = {
  computed: {
    isLoadingData() {
      // console.log(this.storeGetStatusProcessing())
      let isLoadingData = this.storeGetStatusProcessing();
      if (!isLoadingData && this.parentElement) {
        this.parentElement.addEventListener('scroll', this.eventScrollPagination);
        // console.log(this.storeGetDataCount())
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
    this.parentElement = document.getElementById(this.GUID);
    this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;
  },
  updated() { this.parentElementEdge = this.parentElement.getBoundingClientRect().bottom;},
  methods: {
    eventScrollPagination(option) {
      // console.log(document.querySelector(`.${this.GUID}`));
      this.isScroll = !this.isScroll;
      
      let bootAnchorEdge = this.parentElement.querySelector(`.data-table__boot-anchor`).getBoundingClientRect().bottom - 300;
      if (bootAnchorEdge < this.parentElementEdge) {
        this.parentElement.removeEventListener('scroll', this.eventScrollPagination);
        console.log('next');
        if (this.storeGetDataApiNext()) 
          this.storeDispatchRequestData({next: true});
      }
    },
  },
}