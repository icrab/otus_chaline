from rest_framework import serializers
from tea.models import Tea, Grade


class GradeSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='get_type_display')

    class Meta:
        model = Grade
        fields = 'id', 'type'
        extra_kwargs = {
            'id': {'read_only': True},
        }


class TeaSerializer(serializers.ModelSerializer):
    grade = GradeSerializer()

    class Meta:
        model = Tea
        fields = 'id', 'name', 'shorted_name', 'grade', 'cost', 'img', 'storage_type'


class TeaGradeSerializer(serializers.ModelSerializer):
    grade = GradeSerializer()

    class Meta:
        model = Tea
        fields = 'id', 'name', 'shorted_name', 'grade', 'cost', 'img', 'storage_type'


class GradeTeaSerializer(serializers.ModelSerializer):
    tea = TeaSerializer(many=True)
    string_type = serializers.CharField(source='get_type_display')

    class Meta:
        model = Grade
        fields = 'id', 'type', 'tea', 'string_type'