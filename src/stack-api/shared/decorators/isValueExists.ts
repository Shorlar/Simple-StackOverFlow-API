import { InjectEntityManager } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../../entities';
@ValidatorConstraint({ async: true })
@Injectable()
export class IsValueExistConstraint implements ValidatorConstraintInterface {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}
  async validate(args: ValidationArguments) {
    const field = args.property;
    const value = args.value;

    return this.entityManager
      .findOneBy(User, { [field]: value })
      .then((element) => {
        if (element) return false;
        return true;
      });
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} already exists`;
  }
}

export function IsValueExists(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValueExistConstraint,
    });
  };
}
