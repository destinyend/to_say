import timeit

from server.models import ApiStat


class ApiStatMiddleware:
    """Сбор статистики "запрос/время выполнения", для выявления мест требующих оптимизации"""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = timeit.default_timer()
        response = self.get_response(request)
        time = timeit.default_timer() - start_time
        ApiStat.objects.create(request=request.path, time=time)
        return response


