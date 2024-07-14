"""Remove base_location field from Worker model

Revision ID: b5d773a1f94e
Revises: 76d35ef63f0f
Create Date: 2024-07-14 22:43:44.701599

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5d773a1f94e'
down_revision = '76d35ef63f0f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('worker', schema=None) as batch_op:
        batch_op.drop_column('base_location')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('worker', schema=None) as batch_op:
        batch_op.add_column(sa.Column('base_location', sa.VARCHAR(length=200), nullable=False))

    # ### end Alembic commands ###
