use utf8;
package ReLive::Schema::Result::VideoComment;

use strict;
use warnings;

use base 'DBIx::Class::Core';
__PACKAGE__->load_components("InflateColumn::DateTime");
__PACKAGE__->table("comments");
__PACKAGE__->add_columns(
    "user_id",
    {data_type => "char", is_nullable => 0, size => 255},
    "video_id",
    {data_type => "char", is_nullable => 0, size => 255},
    "comment",
    {data_type => "char", is_nullable => 0, size => 512},
    "created_at",
    {data_type => "integer", is_nullable => 0},
    "time",
    {data_type => "integer", is_nullable => 0},
);

__PACKAGE__->set_primary_key("user_id", "video_id", "created_at");

__PACKAGE__->belongs_to( user => "ReLive::Schema::Result::User", "user_id" );
__PACKAGE__->belongs_to( video => "ReLive::Schema::Result::Video", "video_id" );


1;
