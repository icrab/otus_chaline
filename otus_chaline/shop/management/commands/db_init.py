from django.core.management import BaseCommand
from users.models import User
from tea.models import Grade, Tea


def fill_users():
    user = User.objects.create_superuser(username='admin', email='admin@admin.com', password='admin')
    user.save()


def fill_grades():
    for grade_type in range(0, 3):
        grade = Grade(type=grade_type)
        grade.save()


def fill_teas():
    TYPE_RED = 0
    TYPE_PUER = 1
    TYPE_OOLOONG = 2

    grade_red = Grade.objects.filter(type=TYPE_RED).get()
    grade_puer = Grade.objects.filter(type=TYPE_PUER).get()
    grade_ooloong = Grade.objects.filter(type=TYPE_OOLOONG).get()
    teas = [
        {
            'name': 'Янь сюнь сяочжун 1 (Лапсанг Сушонг сильного копчения)',
            'cost': 720,
            'img': 'imgs/syao_jun.jpg',
            'grade': grade_red,
            'storage_type': 0
        },
        {
            'name': 'Ми лань сян хунча',
            'cost': 1905,
            'img': 'imgs/red_mi_lan.jpg',
            'grade': grade_red,
            'storage_type': 0
        },
        {
            'name': 'Гунфу хунча прессованный от завода «Лида» 100 г',
            'cost': 820,
            'img': 'imgs/red_gyn_fu_pl.jpg',
            'grade': grade_red,
            'storage_type': 1
        },
        {
            'name': 'Гунфу хунча',
            'cost': 975,
            'img': 'imgs/red_gyn_fu.jpg',
            'grade': grade_red,
            'storage_type': 0
        },
        {
            'name': 'Удун Ми лань сян даньцун (Фэнхуан даньцун)',
            'cost': 860,
            'img': 'imgs/dark_oo_mi_lan_dc.jpg',
            'grade': grade_ooloong,
            'storage_type': 0
        },
        {
            'name': 'Сунчжун даньцун (Фэнхуан даньцун) Одиночные кусты „Сунский сорт“',
            'cost': 1130,
            'img': 'imgs/dark_oo_mi_lan_dc_5xBPtQ5.jpg',
            'grade': grade_ooloong,
            'storage_type': 0
        },
        {
            'name': 'Байжуй сян',
            'cost': 775,
            'img': 'imgs/dark_oo_bayjay.jpg',
            'grade': grade_ooloong,
            'storage_type': 0
        },
        {
            'name': 'Шуй цзиньгуй 2 (Водная золотая черепаха)',
            'cost': 1260,
            'img': 'imgs/dark_oo_shuy_czin.jpg',
            'grade': grade_ooloong,
            'storage_type': 0
        },
        {
            'name': 'Шу пуэр 2019 г. «Утренний туман» марки «Чайная Линия» 357 г',
            'cost': 2500,
            'img': 'imgs/puer-shu-morning_r.jpg',
            'grade': grade_puer,
            'storage_type': 1
        },
        {
            'name': 'Шэн пуэр 2019 г. «Богатство» марки «Чайная Линия» 357 г',
            'cost': 1800,
            'img': 'imgs/puer-shen-wealth.jpg',
            'grade': grade_puer,
            'storage_type': 1
        },
        {
            'name': 'Шэн пуэр 2019 г. «Иллюзия» марки «Чайная Линия» 357 г',
            'cost': 2600,
            'img': 'imgs/pyer-shen-illusion.jpg',
            'grade': grade_puer,
            'storage_type': 1
        },
        {
            'name': 'Шу пуэр 2019 г. «Просветление» марки «Чайная Линия» 357 г',
            'cost': 1920,
            'img': 'imgs/pyer-shu-enlightenment.jpg',
            'grade': grade_puer,
            'storage_type': 1
        }
    ]
    for tea in teas:
        added_tea = Tea(name=tea['name'], cost=tea['cost'], grade=tea['grade'], img=tea['img'], storage_type=tea['storage_type'])
        added_tea.save()


def fill_dbs():
    if not User.objects.first():
        fill_users()

    if not Grade.objects.first():
        fill_grades()

    if not Tea.objects.first():
        fill_teas()


class Command(BaseCommand):
    def handle(self, *args, **options):
        fill_dbs()
        self.stdout.write(self.style.SUCCESS('Done'))
